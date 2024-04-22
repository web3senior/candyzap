import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { useAuth, web3, _, CandyZapContract } from './../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import DefaultProfile from './../assets/aratta.svg'
import styles from './Rewarded.module.scss'

export default function Rewarded({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [rewardedList, setRewardedList] = useState()
  const [profile, setProfile] = useState([])
  const [from, setFrom] = useState(0)

  const getRewardList = async () => await CandyZapContract.methods.getRewardList().call()

  const readProfile = async (addr) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          to: addr,
          data: '0x54f6127f5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
        },
        'latest',
      ],
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    return await fetch(`https://rpc.lukso.gateway.fm`, requestOptions)
      .then((response) => response.json())
      .then(async (data) => {
        let hex = web3.utils.hexToUtf8(data.result)
        hex = hex.substr(hex.indexOf('ipfs://'), hex.length - hex.indexOf('ipfs://'))
        let CID = hex.replace('ipfs://', '').replace('://', '').replace(/[^\w]/g, '').trim()
        //console.log(CID)

        const response = await fetch(`https://api.universalprofile.cloud/ipfs/${encodeURI(CID)}`)
        if (!response.ok) throw new Response('Failed to get data', { status: 500 })
        const json = await response.json()
        // console.log(json)
        if (typeof json === 'object') return Object.assign(json, { address: addr }) // setProfile((oldProfile) => [...oldProfile, { addr: addr, data: json }])
      })
      .catch((error) => {
        console.error(error)
        return Object.assign({ LSP3Profile: { name: 'anonymous', profileImage: [] } }, { address: addr })
        // setProfile((oldProfile) => [...oldProfile,  }])
      })
  }

  const fetchWhitelist = async () => {
    setProfile([])
    let web3 = new Web3(`https://rpc.lukso.gateway.fm`)
    const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET)
    return await whitelistFactoryContract.methods.getUserList(WhitelistFactoryAddr).call()
  }

  const decodeProfileImage = (data) => {
    let url
    if (data.profileImage && data.profileImage.length > 0) {
      if (data.profileImage[0].url.indexOf(`ipfs`) > -1) return `https://ipfs.io/ipfs/${data.profileImage[0].url.replace('ipfs://', '')}`
      else return `${data.profileImage[0].url}`
    } else url = DefaultProfile
    return url
  }

  const handleRefresh = () => {
    setIsLoading(!isLoading)
    fetchWhitelist()
  }
  function compare(a, b) {
    if (a.counter < b.counter) {
      return 1
    }
    if (a.counter > b.counter) {
      return -1
    }
    return 0
  }
  const showUP = async (res, fromFilter, search = false) => {
    if (search) setProfile([])
    let rewardedListFiltered = res.slice(fromFilter, fromFilter + 50)
    const responses = await Promise.all(rewardedListFiltered.map(async (item) => await Object.assign(await readProfile(item.addr), { counter: item.counter })))

    console.log(responses)

    setProfile((profile) => profile.concat(responses.sort(compare)))
    setIsLoading(false)
    setFrom(fromFilter)
  }

  useEffect(() => {
    // randomCandyColor()

    let rewardAddressList = []

    getRewardList().then((res) => {
      //console.log(res)

      // Add counter property to the object then make a backup of addresses

      res.forEach((item, i) => {
        rewardAddressList.push(item.addr)
        return Object.assign(item, { counter: 1 })
      })

      // Find duplicated address and increase the counter
      res.filter((item, i) => {
        return rewardAddressList.map((addressItem) => {
          if (addressItem === item.addr) return Object.assign(item, { counter: ++item.counter })
        })
      })

      let noneDuplicatedRewardAddressList = []
      res.filter((item, i) => {
        if (typeof noneDuplicatedRewardAddressList.find((element) => element.addr.toLowerCase().toString() === item.addr.toLowerCase().toString()) === 'undefined') {
          noneDuplicatedRewardAddressList.push(item)
        }
      })

      showUP(noneDuplicatedRewardAddressList, from * 2)
    })
  }, [])

  return (
    <>
      <section className={`${styles.section}`}>
        <div className={`__container`} data-width={`xlarge`}>
          <div className={`${styles['grid']} grid grid--fit`} style={{ '--data-width': '120px' }}>
            {profile &&
              profile.map((item, i) => {
                return (
                  <div className={`${styles['grid__item']} d-flex flex-column align-items-center justify-content-center animate pop`} key={i}>
                    <a
                      className={`text-primary d-flex flex-column align-items-center`}
                      target={`_blank`}
                      href={`https://wallet.universalprofile.cloud/${item.address}?referrer=universal-family&network=mainnet`}
                    >
                     
                      <figure className={`${styles['pfp']} d-flex flex-row align-items-center`} title={`${`${item.address.slice(0, 4)}...${item.address.slice(38)}`}`}>
                        <img alt={`The Universal Fam NFT Collection`} src={decodeProfileImage(item.LSP3Profile)} />
                      </figure>
                      <b>@{item.LSP3Profile.name ? item.LSP3Profile.name : 'unnamed'}</b>
                      <span className={`${styles['counter']}`}>{item.counter} </span>
                     <span className={`${styles['amount']}`}> {Math.round(item.counter * 0.2 * 100) / 100} $LYX</span>
                    </a>
                  </div>
                )
              })}
            <DefaultProfileShimmer profile={profile} />
          </div>
        </div>
      </section>
    </>
  )
}

const DefaultProfileShimmer = ({ profile }) => {
  let holder = []
  if (profile.length > 50) return
  for (let i = 0; i < 50 - profile.length; i++) {
    holder.push(<figure className={`${styles['pfp']} d-flex flex-row align-items-center`} />)
  }
  return holder
}
