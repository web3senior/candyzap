import { Title } from './helper/DocumentTitle'
import styles from './Rules.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn ${styles['container']}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__header">{title}</div>
          <div className="card__body">
            <ul className="d-flex flex-column" style={{ rowGap: `1rem`, listStyleType: 'space-counter' }}>
              <li>With CandyZap, 5% of the price goes to a random holder.</li>
              <li>
                Everything operates through a verified and audited smart contract on the <b>LUKSO</b> network
              </li>
              <li>After minting, the wallet of the sender will be included in the list of ticket pools</li>
              <li>There are no restrictions to determine a wallet address as a winner</li>
              <li>During minting, the sender account will not be considered as a holder. However, in the next minting, it will be taken into account</li>
              <li>The owner of the contract can update the prices for both public mint and whitelist mint</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
