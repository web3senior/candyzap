import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate, useParams } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { useAuth, web3, _, CandyZapContract } from '../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import { getTournament, getPlayer } from '../util/api'
import DefaultProfile from './../assets/aratta.svg'
import styles from './Player.module.scss'

export default function Tournament({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [tournament, setTournament] = useState()
  const [player, setPlayer] = useState([])
  const [token, setToken] = useState([])
  const [profile, setProfile] = useState([])
  const [sponser, setSponser] = useState()
  const [from, setFrom] = useState(0)
  const auth = useAuth()
  const params = useParams()
  const timerRef = useRef()
  let timer

  const decodeProfileImage = (data) => {
    let url
    if (data.LSP3Profile.profileImage && data.LSP3Profile.profileImage.length > 0) {
      if (data.LSP3Profile.profileImage[0].url.indexOf(`ipfs`) > -1) return `https://api.universalprofile.cloud/ipfs/${data.LSP3Profile.profileImage[0].url.replace('ipfs://', '')}`
      else return `${data.LSP3Profile.profileImage[0].url}`
    } else url = DefaultProfile
    return url
  }

  const getTokenIdsOf = async (addr) => await CandyZapContract.methods.tokenIdsOf(addr).call()

  const getPlayerAndUP = () => {
    setPlayer([])
    getPlayer(params.id, params.wallet_addr).then(async (res) => {
      console.log(res)
      const responses = await Promise.all(res.map(async (item) => Object.assign(await auth.fetchProfile(item.wallet_addr), item)))
      console.log(responses)
      setPlayer((player) => player.concat(responses))

      setIsLoading(false)
    })
  }

  const startCountdown = async (date, id) => {
    var countDownDate = new Date(new Date(date).getTime())

    timer = setInterval(() => {
      if (!timerRef.current) clearInterval(timer)
      var now = new Date().getTime()
      var distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      timerRef.current.innerHTML = `<div><span>${days}</span><b>d</b>:<span>${hours}</span><b>h</b>:<span>${minutes}</span><b>m</b>:<span>${seconds}</span><b>s</b></div>`

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timer)
        setIsExpired(true)
        timerRef.current.innerHTML = `<p className="text-center"><b>EXPIRED 🆙</b></p>`
      }
    }, 1000)
  }

  useEffect(() => {
    getTournament(params.id).then(async (res) => {
      setTournament(res)
      startCountdown(res[0].end_date, res[0].id)

      auth.fetchProfile(res[0].sponser_addr).then((sponser) => {
        console.log(sponser)
        setSponser(sponser)
      })

      setIsLoading(false)
    })

    getTokenIdsOf(auth.wallet).then(async (res) => {
      setToken(res)
    })

    getPlayerAndUP()

    localStorage.setItem('tournamentId', params.id)
  }, [timer])

  return (
    <>
      <section className={`${styles.section}`}>
        <div className={`__container`} data-width={`large`}>
          <div className={`${styles['grid']} grid grid--fit`} style={{ '--data-width': '120px' }}>
            {tournament &&
              tournament.map((item, i) => {
                return (
                  <div className="ms-Grid" key={i}>
                    <div className={`card mt-20`}>
                      <div className={`card__header d-flex align-items-center justify-content-between`}>
                        Play details
                        <button className={`${styles['btn-refresh']}`} onClick={() => getPlayerAndUP()}>
                          Refresh
                        </button>
                      </div>
                      <div className={`card__body`} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                        <table>
                          <thead style={{ position: 'sticky', top: '0' }}>
                            <tr>
                              <th className="text-left">User</th>
                              <th>Level</th>
                              <th>Score</th>
                              <th>At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {player &&
                              player.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td title={`${item.LSP3Profile.description}`} className={`d-flex flex-row align-items-center`} style={{ columnGap: '.5rem' }}>
                                      <figure className={`${styles['pfp']}`}>
                                        <img alt={`The Universal Fam NFT Collection`} src={decodeProfileImage(item)} />
                                      </figure>
                                      <div>
                                        <b>@{item.LSP3Profile.name}</b>
                                      </div>
                                    </td>
                                    <td className="text-center">{++item.level_number}</td>
                                    <td className="text-center">{item.score}</td>
                                    <td className="text-center" width="10">
                                      <span className="badge badge-light">{item.dt}</span>
                                    </td>
                                  </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className={`${styles['sponser']} mt-40`}>
                      <div className={`card`}>
                        <div className={`card__header`}>Sponser</div>
                        <div className={`card__body d-flex flex-column align-items-center justify-content-center`}>
                          {sponser && sponser.LSP3Profile && (
                            <>
                              <figure>
                                <img src={decodeProfileImage(sponser)} />
                                <figcaption>{sponser.LSP3Profile.name}</figcaption>
                              </figure>
                              <p>{sponser.LSP3Profile.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={` mt-20`}>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-lg6">
                          <div className={`card`}>
                            <div className={`card__header`}>Tournament Details</div>

                            <div className={`card__body`}>
                              <p>
                                <b>{item.name}</b>
                              </p>
                              <p className="mt-10">{item.description}</p>
                              <p className="mt-10">
                                Prize: <b>{item.prize}</b> 💰
                              </p>

                              <div className={`mt-20`} ref={timerRef} id={`countdown${item.id}`}>
                                {item.end_date}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg6">
                          <div className={`card`}>
                            <div className={`card__header`}>Game</div>

                            <div className={`card__body d-flex flex-column align-items-center justify-content-center`}>
                              <figure className={``}>
                                <img src={`${item.game_logo}`} />
                              </figure>
                              <p>
                                <b>{item.game_name}</b>
                              </p>
                              <p>{item.game_description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}
