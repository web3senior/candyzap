import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate, useParams } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { useAuth, web3, _, CandyZapContract } from './../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import { getTournament, getLeaderboard } from './../util/api'
import DefaultProfile from './../assets/aratta.svg'
import styles from './Tournament.module.scss'

export default function Tournament({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [tournament, setTournament] = useState()
  const [leaderboard, setLeaderboard] = useState([])
  const [token, setToken] = useState([])
  const [profile, setProfile] = useState([])
  const [from, setFrom] = useState(0)
  const auth = useAuth()
  const params = useParams()

  const decodeProfileImage = (data) => {
    let url
    if (data.LSP3Profile.profileImage && data.LSP3Profile.profileImage.length > 0) {
      if (data.LSP3Profile.profileImage[0].url.indexOf(`ipfs`) > -1) return `https://api.universalprofile.cloud/ipfs/${data.LSP3Profile.profileImage[0].url.replace('ipfs://', '')}`
      else return `${data.LSP3Profile.profileImage[0].url}`
    } else url = DefaultProfile
    return url
  }

  const getTokenIdsOf = async (addr) => await CandyZapContract.methods.tokenIdsOf(addr).call()

  useEffect(() => {
    getTournament().then(async (res) => {
      setTournament(res)
      setIsLoading(false)
    })

    getTokenIdsOf(auth.wallet).then(async (res) => {
      setToken(res)
    })

    getLeaderboard(params.id).then(async (res) => {
      const responses = await Promise.all(res.map(async (item) => Object.assign(await auth.fetchProfile(item.wallet_addr), item)))
      console.log(responses)
      setLeaderboard((leaderboard) => leaderboard.concat(responses))

      setIsLoading(false)
    })

    localStorage.setItem('tournamentId', params.id)
  }, [])

  return (
    <>
      <section className={`${styles.section}`}>
        <div className={`__container`} data-width={`large`}>
          <div className={`${styles['grid']} grid grid--fit`} style={{ '--data-width': '120px' }}>
            {tournament &&
              tournament.map((item, i) => {
                return (
                  <div className="ms-Grid" key={i}>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-lg6">
                        <div className={`card`}>
                          <div className={`card__header`}>Tournament Details</div>

                          <div className={`card__body`}>
                            <p>
                              <b>{item.name}</b>
                            </p>
                            <p className="mt-40">{item.description}</p>
                            <p>
                              Prize: <b>{item.prize}</b> 💰
                            </p>
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

                    <div className={`card mt-20`}>
                      <div className={`card__header`}>Leaderboard [10 Top Users]</div>
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
                            {leaderboard &&
                              leaderboard.map((item, i) => {
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

                    <div className={`card mt-20`}>
                      <div className={`card__header`}>
                        Play box
                        {token && token.length > 0 && (
                          <>
                            <p className={`${styles['congrats']}`}>Congratulations! You own 2 CandyZap tokens and can now start playing. Enjoy the game!</p>
                          </>
                        )}
                      </div>
                      <div className={`card__body`} style={{ height: '600px' }}>
                        {token && token.length > 0 && <iframe src={`./../../public/sweet-match/index.html`} />}
                        {token && token.length < 1 && (
                          <>
                            <p className={`${styles['error-alert']}`}>
                              You need to mint CandyZap first, mint <Link to={`/`}>NOW!</Link>
                            </p>
                          </>
                        )}
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