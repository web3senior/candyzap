import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import styles from './Layout.module.scss'
import Logo from './../../src/assets/logo.svg'
import CandyZapTypo from './../../src/assets/candyzap-typo.svg'
import Aratta from './../../src/assets/aratta.svg'
import Lukso from './../../src/assets/lukso.svg'
import telegramIcon from './../../src/assets/telegram.svg'
import xIcon from './../../src/assets/x.svg'
import UniversalProfile from './../../src/assets/universal-profile.svg'
import party from 'party-js'

party.resolvableShapes['UniversalProfile'] = `<img src="${UniversalProfile}"/>`
party.resolvableShapes['Lukso'] = `<img src="${Lukso}"/>`

let links = [
  {
    name: 'Home',
    icon: null,
    target: '',
    path: `/`,
  },
  {
    name: 'Rewarded List',
    icon: null,
    target: '',
    path: `rewarded`,
  },
  {
    name: 'Sponsiring',
    icon: null,
    target: '',
    path: `sponsiring`,
  },
  // {
  //   name: 'Tournaments',
  //   icon: null,
  //   target: '',
  //   path: `tournament`,
  // },
  {
    name: 'Contract',
    icon: null,
    target: '_blank',
    path: `https://explorer.execution.mainnet.lukso.network/address/${import.meta.env.VITE_CANDYZAP_CONTRACT_MAINNET}?tab=read_contract`,
  },
]

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const noHeader = ['/sss']
  const auth = useAuth()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()

  return (
    <>
      <Toaster />
      <div className={styles.layout}>
        <header className={`${styles.header}`}>
          <div className={`__container d-flex flex-row align-items-center justify-content-between`} data-width={`xlarge`}>
            <div className={`${styles['left-side']} d-flex flex-row align-items-center justify-content-start`}>
              <Link to={`/`}>
                <div className={`d-flex flex-row align-items-center justify-content-start`} style={{ columnGap: `1rem` }}>
                  <figure>
                    <img alt={import.meta.env.VITE_TITLE} src={Logo} />
                  </figure>
                  <img src={CandyZapTypo} />
                </div>
              </Link>

              <ul className={`${styles['nav']} d-flex flex-row align-items-center justify-content-start`}>
                {links.map((item, i) => {
                  return (
                    <li key={i}>
                      <NavLink to={item.path} target={item.target}>
                        {item.name}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={`d-flex align-items-center justify-content-end`}>
              <div className={`d-flex flex-row align-items-center justify-content-end`}>
                {!auth.wallet ? (
                  <>
                    <button
                      className={styles['connect-button']}
                      onClick={(e) => {
                        party.confetti(document.querySelector(`.connect-btn-party-holder`), {
                          count: party.variation.range(20, 40),
                          shapes: ['UniversalProfile'],
                        })
                        auth.connectWallet()
                      }}
                    />
                  </>
                ) : (
                  <div className={`${styles['profile']} d-flex flex-row align-items-center justify-content-end`}>
                    <figure>
                      <img
                        alt={``}
                        src={`https://ipfs.io/ipfs/${
                          auth.profile && auth.profile.LSP3Profile.profileImage.length > 0 && auth.profile.LSP3Profile.profileImage[0].url.replace('ipfs://', '').replace('://', '')
                        }`}
                      />
                    </figure>

                    <ul className={`${styles['profile']}`}>
                      <li className={`d-flex flex-row align-items-center justify-content-stretch`}>
                        <figure>
                          <img
                            alt={``}
                            src={`https://ipfs.io/ipfs/${
                              auth.profile && auth.profile.LSP3Profile.profileImage.length > 0 && auth.profile.LSP3Profile.profileImage[0].url.replace('ipfs://', '').replace('://', '')
                            }`}
                          />
                        </figure>
                        <div className={`d-flex flex-column align-items-center justify-content-center`}>
                          <b>Hi, {auth.profile && auth.profile.LSP3Profile.name}</b>
                          <span>{auth.wallet && `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}`}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className={`connect-btn-party-holder`} />
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <div className={`d-flex flex-row align-items-center justify-content-center`}>
            <a href={`https://t.me/candyzapnft`} target={`_blank`}>
              <img alt={`Telegram`} src={telegramIcon} />
            </a>
            <a href={`//twitter.com/@CandyZapNFT`} target={`_blank`}>
              <img alt={`Twitter`} src={xIcon} />
            </a>
          </div>
          <br />
          <a href={`//aratta.dev`} target={`_blank`}>
            <figure>
              <img alt={import.meta.env.AUTHOR} src={Aratta} />
            </figure>
          </a>
          <p>@ {new Date().getFullYear()} CandyZap. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
