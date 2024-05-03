import { Title } from './helper/DocumentTitle'
import styles from './Sponsiring.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn ${styles['container']}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__header">Candyzap Tournament Sponsorship!</div>
          <div className="card__body">
            <h1>
              <strong>Candyzap Tournament Sponsorship!</strong>
            </h1>

            <p>
              CandyZap is a unique art collection that is entirely on-chain. This collection utilizes a random holder reward system and operates on the Lukso LSP8 standard. Its color model is based on
              256^3 RGB.
            </p>

            <p>On CandyZap, we organize a 14 day tournament where players can join and compete to achieve the highest score. The winner will receive the prize pool.</p>

            <p>All sponsorships funds go into a pool prize of LYX tokens from the LUKSO blockchain. Winners are selected based on high scoring games twice monthly.&nbsp;</p>

            <h2>
              <strong>Benefits of sponsoring a tournament</strong>
            </h2>

            <p>
              <strong>Increased brand awareness: </strong>By sponsoring a tournament, your brand will be seen by a large number of CandyZap players, which could help to increase brand awareness and
              recognition.
              <br />
              &nbsp;
            </p>

            <p>
              <strong>Targeted marketing: </strong>CandyZap players are likely to be interested in blockchain gaming and NFTs, which could be a good target audience for your brand.
            </p>

            <p>
              <strong>Community engagement: </strong>Sponsoring a tournament can be a great way to engage with the CandyZap community and build relationships with potential customers.
            </p>

            <p>
              <strong>Positive association: </strong>By sponsoring a tournament, you are associating your brand with a fun and exciting event. This can create a positive association with your brand in
              the minds of consumers.
            </p>

            <p>
              <strong>Access to LYX tokens: </strong>Some of the sponsorship funds go into the prize pool of LYX tokens. Depending on the sponsorship tier, you may receive some of these tokens.
            </p>

            <p>
              Overall, sponsoring a CandyZap tournament could be a great way to increase brand awareness, target marketing, engage with the community, and create a positive association with your
              brand.
            </p>

            <h2>
              <strong>Terms</strong>
            </h2>

            <p>All Sponsors are required to provide the pool prize in the form of $LYX or their LSP7 token if agreed upon before the start of the assigned tournament.&nbsp;</p>

            <p>There are 3 sponsorship packages.</p>

            <h3>
              <strong>Pink Plan&nbsp;</strong>
            </h3>

            <p>
              <strong>Minimum pool prize 15 $LYX</strong>
            </p>

            <ul>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 Tweets/Mentions on the X platform.</li>
              <li>Follow up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
            </ul>

            <h3>
              <strong>Booster Plan (Premium)</strong>
            </h3>

            <p>
              <strong>Minimum pool prize 40 $LYX</strong>
            </p>

            <ul>
              <li>Character / Icon branding in the &ldquo;SweetMatch&rdquo; game</li>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 tweets/mentions on the X platform.</li>
              <li>Follow up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
              <li>Banners, logos or artwork on all tweet/mentions</li>
            </ul>

            <p>Graphic assets for premium packages must be received and the start of agreement.</p>

            <p>Pool Prize of $LYX tokens must be received before the tournament begins.&nbsp;</p>

            <h3>
              <strong>Sweet Plan (Premium)</strong>
            </h3>

            <p>
              <strong>Minimum pool prize 100 $LYX</strong>
            </p>

            <ul>
              <li>Character / Icon branding in the &ldquo;SweetMatch&rdquo; game</li>
              <li>Option to use company/developer&rsquo;s token as prize</li>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 tweets/mentions on the X platform.</li>
              <li>Follow up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
              <li>Banners, logos or artwork on all tweet/mentions</li>
            </ul>

            <p>Graphic assets for premium packages must be received at the start of the agreement.</p>

            <p>Pool Prize paid in&nbsp; $LYX tokens or the agreed upon token, must be received before the tournament begins.&nbsp;</p>

            <h2>
              <strong>Tournament Management Fee</strong>
            </h2>

            <ul>
              <li>15 $LYX Pink Plan</li>
              <li>30 $LYX Booster Plan</li>
              <li>45 $LYX Sweet Plan</li>
            </ul>

            <p>
              <br />
              &nbsp;
            </p>

            <p>All rights reserved by Aratta Labs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
