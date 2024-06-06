import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate, useParams } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { useAuth, web3, _, CandyZapContract, PepitoContract } from './../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import MaterialIcon from './helper/MaterialIcon'
import { getTournament, getLeaderboard, serverDate } from './../util/api'
import Place1 from './../assets/place1.svg'
import Place2 from './../assets/place2.svg'
import Place3 from './../assets/place3.svg'
import NoPlace from './../assets/no-place.svg'
import DefaultProfile from './../assets/aratta.svg'
import styles from './Tournament.module.scss'

export default function Tournament({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [tournament, setTournament] = useState()
  const [leaderboard, setLeaderboard] = useState([])
  const [token, setToken] = useState([])
  const [pepito, setPepito] = useState(0)
  const [profile, setProfile] = useState([])
  const [sponsor, setSponsor] = useState()
  const [serverTimestamp, setServerTimestamp] = useState()
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

  const getPepitoTokenIdsOf = async (addr) => await PepitoContract.methods.balanceOf(addr).call()

  const getLeaderboardAndUP = () => {
    setLeaderboard([])
    getLeaderboard(params.id).then(async (res) => {
      console.log(res)
      const responses = await Promise.all(res.map(async (item) => Object.assign(await auth.fetchProfile(item.wallet_addr), item)))
      console.log(responses)
      setLeaderboard((leaderboard) => leaderboard.concat(responses))

      setIsLoading(false)
    })
  }

  const startCountdown = async (tournamentDates) => {
    console.log(tournamentDates)
    var countDownDate = new Date(`${tournamentDates.server_time}`).getTime()
    let distance = countDownDate - tournamentDates.now

    console.log(countDownDate)

    timer = setInterval(() => {
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
    getPepitoTokenIdsOf(auth.wallet).then(async (res) => {
      console.log(res)
      let balanceOf = Math.floor(web3.utils.fromWei(res, 'ether'))
      setPepito(balanceOf)
    })

    getTournament(params.id).then(async (res) => {
      console.log(res)
      setTournament(res)

      // startCountdown(res[0].date)

      auth.fetchProfile(res[0].sponsor_addr).then((sponsor) => {
        console.log(sponsor)
        setSponsor(sponsor)
      })

      setIsLoading(false)
    })

    getTokenIdsOf(auth.wallet).then(async (res) => {
      setToken(res)
    })

    getLeaderboardAndUP()

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
                    <div className={`card`}>
                      <div className={`card__header`}>
                        Play box
                        {token && token.length > 0 && (
                          <>
                            <p className={`badge badge-pill badge-success ms-fontSize-12`}>{token.length} CandyZap</p>
                          </>
                        )}
                        {parseInt(item.id) === 8 && (
                          <>
                            <span className={`badge badge-pill badge-danger ms-fontSize-12`}>{pepito && pepito.toLocaleString()} $PEPITO</span>
                          </>
                        )}
                      </div>
                      <div className={`card__body`} style={{ height: '600px' }}>
                        {(item.date.time_distance < 0 || item.date.now < item.date.start_timestamp || item.date.now > item.date.end_timestamp) && <div className={styles['date-end-cover']}></div>}

                        {token && token.length > 0 && (
                          <>
                            {parseInt(item.id) === 8 && pepito < 1 ? (
                              <>
                                <p className={`${styles['error-alert']}`}>
                                  In order to play, you need to have some $PEPITO token, swap{' '}
                                  <Link target={`_blank`} to={`https://universalswaps.io/tokens/lukso/0x13fe7655c1bef7864dfc206838a20d00e5ce60a1`}>
                                    NOW!
                                  </Link>
                                </p>
                              </>
                            ) : (
                              <>
                                <iframe src={`/${tournament && tournament[0]?.game_folder_name}/index.html`} />
                              </>
                            )}
                          </>
                        )}

                        {token && token.length < 1 && (
                          <>
                            <p className={`${styles['error-alert']}`}>
                              In order to play, you need to mint CandyZap, mint <Link to={`/`}>NOW!</Link>
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={`card mt-20`}>
                      <div className={`card__header d-flex align-items-center justify-content-between`}>
                        Leaderboard [10 Top Users]
                        <button className={`${styles['btn-refresh']}`} onClick={() => getLeaderboardAndUP()}>
                          <MaterialIcon name={`refresh`} />
                        </button>
                      </div>
                      <div className={`card__body`} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                        <table>
                          <thead style={{ position: 'sticky', top: '0', zIndex: 2 }}>
                            <tr>
                              <th className="text-left">Player</th>
                              <th>Score</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaderboard &&
                              leaderboard.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td title={`${item.LSP3Profile.description}`} className={`d-flex flex-row align-items-center`} style={{ columnGap: '.5rem' }}>
                                      {i === 0 && (
                                        <figure className={`${styles['medal']}`}>
                                          <img alt={`Place1`} src={Place1} />
                                        </figure>
                                      )}
                                      {i === 1 && (
                                        <figure className={`${styles['medal']}`}>
                                          <img alt={`Place2`} src={Place2} />
                                        </figure>
                                      )}
                                      {i === 2 && (
                                        <figure className={`${styles['medal']}`}>
                                          <img alt={`Place3`} src={Place3} />
                                        </figure>
                                      )}
                                      {i > 2 && (
                                        <figure className={`${styles['medal']}`}>
                                          <img alt={`NoPlace`} src={NoPlace} />
                                        </figure>
                                      )}
                                      <figure className={`${styles['pfp']}`}>
                                        <img alt={`The Universal Fam NFT Collection`} src={decodeProfileImage(item)} />
                                      </figure>
                                      <div className={`d-flex flex-column`}>
                                        <b className={``}>
                                          @{item.LSP3Profile.name} ({item.counter} times played)
                                        </b>
                                        <Link to={`https://universalprofile.cloud/${item.wallet_addr}`} target={`_blank`} style={{ color: 'black', opacity: 0.2, zIndex: 1 }}>
                                          {item.wallet_addr}
                                        </Link>
                                      </div>
                                    </td>
                                    <td className="text-center">{item.max_score}</td>
                                    <td className="text-center" width="10">
                                      <Link className="btn" to={`/player/${item.wallet_addr}/tournament/${params.id}`}>
                                        Details
                                      </Link>
                                    </td>
                                  </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className={`${styles['sponsor']} mt-40`}>
                      <div className={`card`}>
                        <div className={`card__header`}>sponsor</div>
                        <div className={`card__body d-flex flex-column align-items-center justify-content-center`}>
                          {sponsor && sponsor.LSP3Profile && (
                            <>
                              <figure>
                                <img src={decodeProfileImage(sponsor)} />
                                <figcaption>{sponsor.LSP3Profile.name}</figcaption>
                              </figure>
                              <p>{sponsor.LSP3Profile.description}</p>
                              <p>
                                {item?.sponsor_url && (
                                  <Link to={`${item?.sponsor_url}`} target={`_blank`}>
                                    {item?.sponsor_url}
                                  </Link>
                                )}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="alert alert--danger mt-20 border">
                      Dear CandyZap Tournament Players,
                      <br />
                      Please Note: our tournament runs on Eastern Standard US Time. <br />
                      <br />
                      All Official Announcements will be posted on www.candyzap.com and the CandyZap X page.
                      <br />
                      Thanks for playing!🍭🥳
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

                              <p className="mt-10">
                                Start date: <b>{item.start_date}</b> EST 🕛
                              </p>

                              <p className="mt-10">
                                End date: <b>{item.end_date}</b> EST 🕛
                              </p>

                              {/* <div className={`mt-20`} ref={timerRef} id={`countdown${item.id}`}>
                                {item.end_date}
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg6">
                          <div className={`card`}>
                            <div className={`card__header`}>Game</div>

                            <div className={`card__body d-flex flex-column align-items-center justify-content-center`}>
                              <figure className={``}>
                                <img src={`${item.game_logo}`} style={{width: '120px'}}/>
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
