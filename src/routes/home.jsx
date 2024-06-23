import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import { getTournamentList } from './../util/api'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth, web3, _, contract } from './../contexts/AuthContext'
import Lips from './../../src/assets/lips.svg'
import Yummy from './../../src/assets/yummy.svg'
import TournamentsBanner from './../../src/assets/tournaments-banner.png'

import MaxSupplyIcon from './../../src/assets/max-supply.svg'
import MintPriceIcon from './../../src/assets/mint-price.svg'
import HoldersIcon from './../../src/assets/holders.svg'
import RewardedIcon from './../../src/assets/rewarded.svg'
import BackToHoldersIcon from './../../src/assets/back-to-holders.svg'
import TerophyIcon from './../../src/assets/teroph-icon.svg'
import IconAds from './../../src/assets/icon-ads.svg'

import FivePercent from './../../src/assets/5percent.svg'
import BannerPartyIcon from './../../src/assets/banner-party-icon.svg'
import Banner from './../../src/assets/banner.png'
import Web3 from 'web3'
import ABI from './../abi/candyzap.json'
import party from 'party-js'
import styles from './Home.module.scss'

import Vector0 from './../../src/assets/candy/Vector-0.svg'
import Vector1 from './../../src/assets/candy/Vector-1.svg'
import Vector2 from './../../src/assets/candy/Vector-2.svg'
import Vector3 from './../../src/assets/candy/Vector-3.svg'
import Vector4 from './../../src/assets/candy/Vector-4.svg'
import Vector5 from './../../src/assets/candy/Vector-5.svg'
import Vector6 from './../../src/assets/candy/Vector-6.svg'
import Vector7 from './../../src/assets/candy/Vector-7.svg'

party.resolvableShapes['Vector0'] = `<img src="${Vector0}"/>`
party.resolvableShapes['Vector1'] = `<img src="${Vector1}"/>`
party.resolvableShapes['Vector2'] = `<img src="${Vector2}"/>`
party.resolvableShapes['Vector3'] = `<img src="${Vector3}"/>`
party.resolvableShapes['Vector4'] = `<img src="${Vector4}"/>`
party.resolvableShapes['Vector5'] = `<img src="${Vector5}"/>`
party.resolvableShapes['Vector6'] = `<img src="${Vector6}"/>`
party.resolvableShapes['Vector7'] = `<img src="${Vector7}"/>`

const WhitelistFactoryAddr = web3.utils.padLeft(`0x2`, 64)

export const loader = async () => {
  return defer({ key: 'val' })
}

function Home({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [tournament, setTournament] = useState()
  const [price, setPrice] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [holderReward, setHolderReward] = useState(0)
  const [maxSupply, setMaxSupply] = useState(0)
  const [winner, setWinner] = useState('')
  const [candyPrimaryColor, setCandyPrimaryColor] = useState('#59F235')
  const [candySecondaryColor, setCandySecondaryColor] = useState('#0E852E')
  const auth = useAuth()
  const navigate = useNavigate()
  const txtSearchRef = useRef()

  const addMe = async () => {
    const t = toast.loading(`Loading`)
    try {
      web3.eth.defaultAccount = auth.wallet

      const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET, {
        from: auth.wallet,
      })
      console.log(whitelistFactoryContract.defaultChain, Date.now())
      await whitelistFactoryContract.methods
        .addUser(WhitelistFactoryAddr)
        .send()
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`You hav been added to the list.`)
          party.confetti(document.querySelector(`h4`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const addUserByManager = async () => {
    const t = toast.loading(`Loading`)
    try {
      web3.eth.defaultAccount = auth.wallet

      const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET, {
        from: auth.wallet,
      })

      await whitelistFactoryContract.methods
        .addUserByManager(WhitelistFactoryAddr)
        .send()
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`You hav been added to the list.`)
          party.confetti(document.querySelector(`h4`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const updateWhitelist = async () => {
    web3.eth.defaultAccount = `0x188eeC07287D876a23565c3c568cbE0bb1984b83`

    const whitelistFactoryContract = new web3.eth.Contract('', `0xc407722d150c8a65e890096869f8015D90a89EfD`, {
      from: '0x188eeC07287D876a23565c3c568cbE0bb1984b83', // default from address
      gasPrice: '20000000000',
    })
    console.log(whitelistFactoryContract.defaultChain, Date.now())
    await whitelistFactoryContract.methods
      .updateWhitelist(web3.utils.utf8ToBytes(1), `q1q1q1q1`, false)
      .send()
      .then((res) => {
        console.log(res)
      })
  }

  const createWhitelist = async () => {
    console.log(auth.wallet)
    web3.eth.defaultAccount = auth.wallet

    const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET)
    await whitelistFactoryContract.methods
      .addWhitelist(``, Date.now(), 1710102205873, `0x0D5C8B7cC12eD8486E1E0147CC0c3395739F138d`, [])
      .send({ from: auth.wallet })
      .then((res) => {
        console.log(res)
      })
  }

  const handleSearch = async () => {
    let dataFilter = app
    if (txtSearchRef.current.value !== '') {
      let filteredData = dataFilter.filter((item) => item.name.toLowerCase().includes(txtSearchRef.current.value.toLowerCase()))
      if (filteredData.length > 0) setApp(filteredData)
    } else setApp(backApp)
  }

  const fetchIPFS = async (CID) => {
    try {
      const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`)
      if (!response.ok) throw new Response('Failed to get data', { status: 500 })
      const json = await response.json()
      // console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }

    return false
  }

  const getLike = async (appId) => {
    let web3 = new Web3(import.meta.env.VITE_RPC_URL)
    const UpstoreContract = new web3.eth.Contract(ABI, import.meta.env.VITE_UPSTORE_CONTRACT_MAINNET)
    return await UpstoreContract.methods.getLikeTotal(appId).call()
  }

  const handleRemoveRecentApp = async (e, appId) => {
    localStorage.setItem('appSeen', JSON.stringify(recentApp.filter((reduceItem) => reduceItem.appId !== appId)))

    // Refresh the recent app list
    getRecentApp().then((res) => {
      setRecentApp(res)
    })
  }

  // const getRecentApp = async () => {
  //   return await JSON.parse(localStorage.getItem(`appSeen`))
  // }
  /**
   * Random Candy Color Generator
   */
  const randomCandyColor = (maxArg) => {
    let max = maxArg | 256
    let rgb1 = `${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)}`
    let rgb2 = `${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)}`
    setCandyPrimaryColor(`rgb(${rgb1})`)
    setCandySecondaryColor(`rgb(${rgb2})`)
  }

  const getPrice = async () => await contract.methods.price().call()

  const getTotalSupply = async () => await contract.methods.totalSupply().call()

  const getHolderReward = async () => await contract.methods.HOLDER_REWARD().call()

  const getMaxSupply = async () => await contract.methods.MAX_SUPPLY().call()

  const handleMint = async (e) => {
    if (!price) {
      toast.error(`Can't read the mint price`)
      return false
    }
    const t = toast.loading(`Waiting for transaction's confirmation`)
    e.target.innerText = `Waiting...`
    if (typeof window.lukso === 'undefined') window.open('https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en-US&utm_source=candyzap.com', '_blank')

    try {
      window.lukso
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          const account = accounts[0]
          console.log(account)
          // walletID.innerHTML = `Wallet connected: ${account}`;

          web3.eth.defaultAccount = account
          contract.methods
            .newMint()
            .send({
              from: account,
              value: web3.utils.toWei(price, 'ether'),
            })
            .then((res) => {
              setWinner(res.events.Rewarded.returnValues[0])
              console.log('Winner:' + res.events.Rewarded.returnValues[0])
              // Run partyjs
              party.confetti(document.querySelector(`header`), {
                count: party.variation.range(20, 40),
                shapes: ['Vector0', 'Vector1', 'Vector2', 'Vector3', 'Vector4', 'Vector5', 'Vector6', 'Vector7'],
              })

              e.target.innerText = `Mint`
              toast.dismiss(t)
            })
            .catch((error) => {
              e.target.innerText = `Mint`
              toast.dismiss(t)
            })
          // Stop loader when connected
          //connectButton.classList.remove("loadingButton");
        })
        .catch((error) => {
          e.target.innerText = `Mint`
          // Handle error
          console.log(error, error.code)
          toast.dismiss(t)
          // Stop loader if error occured

          // 4001 - The request was rejected by the user
          // -32602 - The parameters were invalid
          // -32603- Internal error
        })
    } catch (error) {
      console.log(error)
      toast.dismiss(t)
      e.target.innerText = `Mint`
    }
  }

  useEffect(() => {
    // Generate random candy
    randomCandyColor()

    getTournamentList().then(async (res) => {
      console.log(res)
      setTournament(res.reverse())
      setIsLoading(false)
    })

    getPrice().then(async (res) => {
      setPrice(web3.utils.fromWei(res, 'ether'))
      setIsLoading(false)
    })

    getTotalSupply().then(async (res) => {
      setTotalSupply(web3.utils.toNumber(res))
      setIsLoading(false)
    })

    getHolderReward().then(async (res) => {
      setHolderReward(web3.utils.toNumber(res))
      setIsLoading(false)
    })

    getMaxSupply().then(async (res) => {
      setMaxSupply(web3.utils.toNumber(res))
      setIsLoading(false)
    })
    // getRecentApp().then((res) => {
    //   setRecentApp(res)
    // })
  }, [])

  return (
    <>
      <section className={`${styles.section} ms-motion-slideDownIn`}>
        <div className={`${styles['lips']}`}>
          <div className={`${styles['lips__container']} __container d-flex flex-column align-items-center`} data-width={`large`}>
            <figure>
              <img alt={import.meta.env.VITE_NAME} src={Lips} />
              <svg width="128" height="148" viewBox="0 0 128 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M84.0581 74.6669L90.4095 69.825L87.8387 66.4527L81.4873 71.2947L84.0581 74.6669Z" fill="#FE005B" />
                <path d="M64.6304 89.4776L58.2791 94.3195L55.7082 90.9473L62.0596 86.1053L64.6304 89.4776Z" fill="#FE005B" />
                <path d="M67.2013 92.8498L72.6186 88.7199L75.7943 86.299L78.97 83.878L86.629 78.0392L84.0581 74.6669L64.6304 89.4776L67.2013 92.8498Z" fill={candyPrimaryColor} />
                <path d="M78.97 83.878L77.1953 85.2309L119.971 141.341L124.548 137.852L81.772 81.7418L78.97 83.878Z" fill="#FF999A" />
                <path d="M75.7943 86.299L72.6186 88.7199L115.394 144.83L119.971 141.341L77.1953 85.2309L75.7943 86.299Z" fill="#FFCC9A" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.6411 9.84481L32.0703 6.47256L12.6426 21.2832L15.2134 24.6555L8.86208 29.4974L11.4329 32.8697L5.08153 37.7116L7.65236 41.0839L4.28987 43.6473L6.57505 46.6448L3.21256 49.2082L8.06856 55.578L4.89288 57.999L9.89171 64.5561L6.52922 67.1195L21.3829 86.6036L24.7454 84.0402L29.7442 90.5974L32.9199 88.1764L37.7759 94.5462L41.1384 91.9828L43.4235 94.9804L46.786 92.417L49.3569 95.7892L52.5308 93.3696L55.7082 90.9473L58.2791 94.3195L64.6304 89.4776L67.2013 92.8498L72.6186 88.7199L115.394 144.83L124.548 137.852L81.772 81.7418L86.629 78.0392L84.0581 74.6669L90.4095 69.825L87.8387 66.4527L91.2122 63.8809L94.1901 61.6108L91.9367 58.655L91.6192 58.2385L94.9817 55.6751L92.6966 52.6776L93.6301 51.9659L96.059 50.1142L91.203 43.7444L94.3787 41.3234L89.3799 34.7662L92.7424 32.2029L77.8887 12.7188L74.5262 15.2821L69.5274 8.725L66.3517 11.146L61.4957 4.77617L58.1332 7.33956L55.8481 4.342L52.4856 6.90539L49.9147 3.53314L43.5634 8.37509L40.9925 5.00285L34.6411 9.84481ZM34.9983 7.16708L41.3496 2.32513L43.9205 5.69738L50.2718 0.855425L52.8427 4.22767L56.2052 1.66428L58.4903 4.66183L61.8528 2.09845L66.7088 8.46826L69.8845 6.04728L74.8833 12.6044L78.2458 10.041L95.419 32.5678L92.0566 35.1312L97.0554 41.6883L93.8797 44.1093L98.7357 50.4791L95.3732 53.0425L97.6584 56.04L94.2959 58.6034L96.8667 61.9757L90.5153 66.8176L93.0862 70.1899L86.7348 75.0318L89.3056 78.4041L84.4487 82.1067L127.224 138.217L115.037 147.508L72.2614 91.3977L66.8441 95.5276L64.2733 92.1553L57.9219 96.9973L55.3511 93.625L48.9997 98.467L46.4289 95.0947L43.0664 97.6581L40.7812 94.6606L37.4187 97.224L32.5627 90.8542L29.387 93.2751L24.3882 86.718L21.0257 89.2814L3.85249 66.7546L7.21498 64.1912L2.21615 57.6341L5.39184 55.2131L0.535831 48.8433L3.89832 46.2799L1.61314 43.2824L4.97564 40.719L2.40481 37.3467L8.75618 32.5048L6.18535 29.1325L12.5367 24.2906L9.9659 20.9183L32.4275 3.79483L34.9983 7.16708Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.7919 36.7384L41.7812 19.2126L44.2185 22.4097L46.8338 20.4159L46.8651 20.457L47.4388 20.0197L50.0417 23.434L53.2977 20.9518L55.8506 24.3004L58.9834 21.9122L64.126 28.658L67.2093 26.3075L76.9134 39.0367L73.8301 41.3872L78.8117 47.9217L75.7722 50.2388L77.3971 52.3702L74.0461 54.9248L76.4682 58.1019L57.2385 72.7616L54.7776 69.5335L51.8353 71.7766L49.3744 68.5484L46.1869 70.9784L43.9721 68.0732L40.8033 70.4889L35.0305 62.9166L35.0119 62.9308L31.8698 58.8092L35.5884 55.9742L30.3045 49.0431L30.33 49.0237L30.29 48.9713L35.8631 44.7227L33.4883 41.6075L42.5835 34.6738L44.9583 37.7889L48.0486 35.4331L48.2017 35.634L48.2915 35.5655L50.8944 38.9799L54.1504 36.4976L55.8325 38.7041L59.2382 43.1433L59.2454 43.1378L61.0291 45.4776L62.5579 47.4703L59.4418 49.8611L62.0047 53.2229L57.8949 56.356L57.8918 56.3519L52.836 60.2062L50.4612 57.091L48.4997 58.5864L42.3578 50.5299L46.4676 47.3968L51.8421 54.4468L54.7381 52.2391L52.0067 48.6562L55.1285 46.2763L53.1886 43.7478L49.9268 46.2345L47.1707 42.6193L37.5164 49.9793L42.8753 57.0088L39.1753 59.8295L41.7004 63.1418L45.4413 60.2899L47.7266 63.2876L51.241 60.6084L53.7019 63.8365L57.1346 61.2196L59.5955 64.4478L65.702 59.7925L63.2799 56.6153L70.0635 51.4439L64.8764 44.6398L67.9976 42.2604L61.9624 34.3438L58.8296 36.732L53.7894 30.1206L50.5334 32.6028L46.4399 27.2332L26.0291 42.7933L28.6539 46.2364L25.4664 48.6663L28.0912 52.1094L25.1489 54.3524L30.461 61.3205L27.3671 63.6791L36.6614 75.8709L39.4285 73.7615L44.928 80.9754L47.8703 78.7324L53.6199 86.2743L61.0573 80.6044L63.5064 83.817L82.1175 69.6288L79.7934 66.5802L86.4953 61.4711L83.9955 58.192L93.0907 51.2583L93.6301 51.9659L96.2328 55.3799L91.9367 58.655L88.9588 60.9252L91.2122 63.8809L91.4586 64.2042L88.1895 66.6965L90.5136 69.7452L58.2888 94.3116L55.9022 91.181L52.7148 93.6109L52.5308 93.3696L49.9025 89.922L46.9602 92.165L41.8958 85.5219L39.1288 87.6313L33.7493 80.5748L30.4933 83.0571L18.6644 67.5406L21.9204 65.0584L16.4882 57.9329L19.5822 55.5742L17.5221 52.8719L20.4644 50.6289L17.6521 46.9399L20.8396 44.51L19.2147 42.3786L19.3782 42.254L18.9407 41.6801L21.2292 39.9355L18.7919 36.7384Z"
                  fill={candySecondaryColor}
                />
                <path
                  d="M40.9925 5.00285L34.6411 9.84481L32.0703 6.47256L12.6426 21.2832L15.2134 24.6555L8.86208 29.4974L11.4329 32.8697L5.08153 37.7116L7.65236 41.0839L4.28987 43.6473L6.57505 46.6448L3.21256 49.2082L8.06856 55.578L4.89288 57.999L9.89171 64.5561L6.52922 67.1195L21.3829 86.6036L24.7454 84.0402L29.7442 90.5974L32.9199 88.1764L37.7759 94.5462L41.1384 91.9828L43.4235 94.9804L46.786 92.417L49.3569 95.7892L52.5308 93.3696L49.9025 89.922L46.9602 92.165L41.8958 85.5219L39.1288 87.6313L33.7493 80.5748L30.4933 83.0571L18.6644 67.5406L21.9204 65.0584L16.4882 57.9329L19.5822 55.5742L17.5221 52.8719L20.4644 50.6289L17.6521 46.9399L20.8396 44.51L19.2147 42.3786L19.3782 42.254L18.9407 41.6801L21.2292 39.9355L18.7919 36.7384L41.7812 19.2126L44.2185 22.4097L46.8338 20.4159L46.8651 20.457L47.4388 20.0197L50.0417 23.434L53.2977 20.9518L55.8506 24.3004L58.9834 21.9122L64.126 28.658L67.2093 26.3075L76.9134 39.0367L73.8301 41.3872L78.8117 47.9217L75.7722 50.2388L77.3971 52.3702L74.0461 54.9248L76.4682 58.1019L57.2385 72.7616L54.7776 69.5335L51.8353 71.7766L49.3744 68.5484L46.1869 70.9784L43.9721 68.0732L40.8033 70.4889L35.0305 62.9166L35.0119 62.9308L31.8698 58.8092L35.5884 55.9742L30.3045 49.0431L30.33 49.0237L30.29 48.9713L35.8631 44.7227L33.4883 41.6075L42.5835 34.6738L44.9583 37.7889L48.0486 35.4331L48.2017 35.634L48.2915 35.5655L50.8944 38.9799L54.1504 36.4976L55.8325 38.7041L59.2382 43.1433L59.2454 43.1378L61.0291 45.4776L62.5579 47.4703L59.4418 49.8611L62.0047 53.2229L57.8949 56.356L57.8918 56.3519L52.836 60.2062L50.4612 57.091L48.4997 58.5864L42.3578 50.5299L46.4676 47.3968L51.8421 54.4468L54.7381 52.2391L52.0067 48.6562L55.1285 46.2763L53.1886 43.7478L49.9268 46.2345L47.1707 42.6193L37.5164 49.9793L42.8753 57.0088L39.1753 59.8295L41.7004 63.1418L45.4413 60.2899L47.7266 63.2876L51.241 60.6084L53.7019 63.8365L57.1346 61.2196L59.5955 64.4478L65.702 59.7925L63.2799 56.6153L70.0635 51.4439L64.8764 44.6398L67.9976 42.2604L61.9624 34.3438L58.8296 36.732L53.7894 30.1206L50.5334 32.6028L46.4399 27.2332L26.0291 42.7933L28.6539 46.2364L25.4664 48.6663L28.0912 52.1094L25.1489 54.3524L30.461 61.3205L27.3671 63.6791L36.6614 75.8709L39.4285 73.7615L44.928 80.9754L47.8703 78.7324L53.6199 86.2743L61.0573 80.6044L63.5064 83.817L82.1175 69.6288L79.7934 66.5802L86.4953 61.4711L83.9955 58.192L93.0907 51.2583L93.6301 51.9659L96.059 50.1142L91.203 43.7444L94.3787 41.3234L89.3799 34.7662L92.7424 32.2029L77.8887 12.7188L74.5262 15.2821L69.5274 8.725L66.3517 11.146L61.4957 4.77617L58.1332 7.33956L55.8481 4.342L52.4856 6.90539L49.9147 3.53314L43.5634 8.37509L40.9925 5.00285Z"
                  fill={candyPrimaryColor}
                />
                <path d="M91.2122 63.8809L94.1901 61.6108L91.9367 58.655L88.9588 60.9252L91.2122 63.8809Z" fill={candyPrimaryColor} />
              </svg>
              <button className={`${styles['dice']}`} onClick={() => randomCandyColor()} />
            </figure>

            <figure>
              <img src={Yummy} />
            </figure>

            <p style={{ maxWidth: '500px', textOverflow: 'balance', lineHeight: '1.4' }} className="text-center">
              CandyZap is an on-chain art collection that utilizes a random holder reward system. It operates on the Lukso LSP8 standard and uses a 256^3 RGB color model.
            </p>

            <button className={`${styles['mint']} mt-20`} onClick={(e) => handleMint(e)}>Mint</button>

            {winner && (
              <h4 className={`mt-40`}>
                <b>Winner has been rewarded:</b>{' '}
                <a target={`_blank`} href={`https://wallet.universalprofile.cloud/${winner}?network=mainnet`}>
                  {winner} 🍭
                </a>
                <br />
                <a
                  href={`
                https://twitter.com/share?text=Just minted my CandyZap!  Can't wait to see if the random reward system brings any sweet surprises 🍭🆙✨ @CandyZapNFT
                &url=https://candyzap.com/
                &hashtags=LUKSO,CandyZap,NFT,LSP8,NFTCommunity
                `}
                  target={`_blank`}
                >
                  Share on 𝕏
                </a>
              </h4>
            )}
          </div>
        </div>

        <div className={`${styles['statistics']}`}>
          <div className={`__container`} data-width={`large`}>
            <div className={`${styles['statistics__grid']} grid grid--fit`} style={{ '--data-width': '140px' }}>
              <div className={`${styles['statistics__card']}`}>
                <div className={`${styles['statistics__card__header']}`}>
                  <div>Max Supply</div>
                </div>
                <div className={`${styles['statistics__card__body']}`}>
                  <figure>
                    <img alt={`Max Supply`} src={MaxSupplyIcon} />
                  </figure>
                  <b>{maxSupply.toLocaleString()}</b>
                  <span>{(maxSupply - totalSupply).toLocaleString()} available tokens</span>
                </div>
              </div>

              <div className={`${styles['statistics__card']}`}>
                <div className={`${styles['statistics__card__header']}`}>
                  <div>Mint Price</div>
                </div>
                <div className={`${styles['statistics__card__body']}`}>
                  <figure>
                    <img alt={`Mint Price`} src={MintPriceIcon} />
                  </figure>
                  <b>{price} $LYX</b>
                  <span>per token</span>
                </div>
              </div>

              <div className={`${styles['statistics__card']}`}>
                <div className={`${styles['statistics__card__header']}`}>
                  <div>Holders</div>
                </div>
                <div className={`${styles['statistics__card__body']}`}>
                  <figure>
                    <img alt={`Holders`} src={HoldersIcon} />
                  </figure>
                  <b>{totalSupply}</b>
                  <span>total owner</span>
                </div>
              </div>

              <div className={`${styles['statistics__card']}`}>
                <div className={`${styles['statistics__card__header']}`}>
                  <div>back To holders</div>
                </div>
                <div className={`${styles['statistics__card__body']}`}>
                  <figure>
                    <img alt={`Back To holders`} src={BackToHoldersIcon} />
                  </figure>
                  <b>{holderReward}%</b>
                  <span>random-based</span>
                </div>
              </div>

              <div className={`${styles['statistics__card']}`}>
                <div className={`${styles['statistics__card__header']}`}>
                  <div>Rewarded</div>
                </div>

                <div className={`${styles['statistics__card__body']}`}>
                  <figure>
                    <img alt={`Holders`} src={RewardedIcon} />
                  </figure>
                  <b>{totalSupply}</b>
                  <span>users rewarded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id={`tournament`} className={`${styles['tournament']} d-flex flex-row flex-wrap  align-items-start justify-content-between`}>
          <div className={`__container`} data-width={`large`}>
            <div className={`mb-40`}>
              <h3>Tournaments</h3>
              <p>
              Sweet victory awaits. Join the CandyZap Tournaments!
              </p>
            </div>

            <figure className={`mb-30`}>
              <img src={TournamentsBanner} alt={`Tournaments`}/>
            </figure>

            <div className={`${styles['tournament__grid']} grid grid--fit`} style={{ '--data-width': '300px' }}>
              {!tournament && (
                <>
                  <Shimmer>
                    <div style={{ height: `300px`, background: '#F8FAF8' }} />
                  </Shimmer>
                  <Shimmer>
                    <div style={{ height: `300px`, background: '#F8FAF8' }} />
                  </Shimmer>
                  <Shimmer>
                    <div style={{ height: `300px`, background: '#F8FAF8' }} />
                  </Shimmer>
                </>
              )}
              {tournament &&
                tournament.map((item, i) => {
                  return (
                    <Link to={`play/tournament/${item.id}`} key={i}>
                      <TournamentItem item={item} />
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>

        <div className={`__container`} data-width={`large`}>
          <figure className=" ms-hiddenXlDown mt-40">
            <Link to={`rules`} className={``}>
              <img alt={`Banner`} src={Banner} />
            </Link>
          </figure>
          <Link to={`rules`} className={`${styles['btn-rule']} ms-hiddenXxlUp`}>
            Rules
          </Link>
        </div>
      </section>
    </>
  )
}

const TournamentItem = ({ item }) => {
  return (
    <div className={`${styles['tournament__card']} `}>
      <figure>
        <img alt={item.name} src={`${item.cover}`} />
      </figure>
      <div className={`${styles['tournament__card__body']}`}>
        <h4>{item.name}</h4>
        <div className={`mt-10  d-flex flex-row flex-wrap align-items-start justify-content-start`} style={{columnGap:'.25rem'}}>
          <TournamentState position={item.position} date={item.date} start={item.start_date} end={item.end_date} />
          {item.prize && <span className={`badge badge-purpink badge-pill`}>{item.prize}</span>}
          {item.total_player > 0 && <span className={`badge badge-primary badge-pill`}>{item.total_player} plyers</span>}
        </div>
      </div>
    </div>
  )
}

const TournamentState = ({ position, date, start,end }) => {
  let start_timestamp = date.start_timestamp
  let end_timestamp = date.end_timestamp
  let now = date.now
  let time_distance = date.time_distance
  let server_date = date.server_date

  console.log(date)

  if (time_distance > 0 && now < start_timestamp) return <span className={`badge badge-warning badge-pill`}>Start: {start} EST</span>
  if (time_distance < 0) return <span className={`badge badge-danger badge-pill`}>Ended</span>
  if (time_distance > 0 && now > start_timestamp) return (<><span className={`badge badge-success badge-pill`}>Open</span><span className={`badge badge-warning badge-pill ml-10`}>End: {end} EST</span></>)
}

export default Home
