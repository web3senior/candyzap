import { Title } from './helper/DocumentTitle'
import styles from './Sponsoring.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn ${styles['container']}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__header">Candyzap Tournament Sponsorship!</div>
          <div className="card__body">
            <p>
              <strong>Candyzap Tournament Sponsorship!</strong>
            </p>
            <p>
              CandyZap is a unique art collection that is entirely on-chain. This collection utilizes a random holder reward system and operates on the Lukso LSP8 standard. Its color model is based on
              256^3 RGB.
            </p>
            <p>On CandyZap, we organize a 14-day tournament where players can join and compete to achieve the highest score. The winner will receive the prize pool.</p>
            <p>All sponsorship funds go into a pool prize of LYX tokens from the LUKSO blockchain. Winners are selected based on high-scoring games twice monthly.&nbsp;</p>
            <p>
              <strong>Benefits of sponsoring a tournament</strong>
            </p>
            <p>
              <strong>Increased brand awareness: </strong>By sponsoring a tournament, your brand will be seen by a large number of CandyZap players, which could help to increase brand awareness and
              recognition.
              <br />
              &nbsp;
            </p>
            <p>
              <strong>Targeted marketing: </strong>CandyZap players are likely to be interested in blockchain gaming and NFTs, which could be a good target audience for your brand.
              <br />
              &nbsp;
            </p>
            <p>
              <strong>Community engagement: </strong>Sponsoring a tournament can be a great way to engage with the CandyZap community and build relationships with potential customers.
              <br />
              &nbsp;
            </p>
            <p>
              <strong>Positive association: </strong>By sponsoring a tournament, you are associating your brand with a fun and exciting event. This can create a positive association with your brand in
              the minds of consumers.
              <br />
              &nbsp;
            </p>
            <p>
              <strong>Access to LYX tokens: </strong>Some of the sponsorship funds go into the prize pool of LYX tokens. Depending on the sponsorship tier, you may receive some of these tokens.
              <br />
              &nbsp;
            </p>
            <p>
              Overall, sponsoring a CandyZap tournament could be a great way to increase brand awareness, target marketing, engage with the community, and create a positive association with your
              brand.
            </p>
            <p>
              <strong>Terms</strong>
            </p>
            <p>All Sponsors are required to provide the pool prize in the form of $LYX or their LSP7 token if agreed upon before the start of the assigned tournament.&nbsp;</p>
            <p>There are 3 sponsorship packages.</p>
            <p>
              <strong>Pink Plan&nbsp;</strong>
            </p>

            <p>
              <strong>Minimum pool prize 15 $LYX</strong>
            </p>

            <ul>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 Tweets/Mentions on the X platform.</li>
              <li>Follow-up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
            </ul>

            <p>
              <strong>Tournament Management Fee</strong>
            </p>

            <ul>
              <li>15 $LYX Pink Plan&nbsp;</li>
            </ul>

          
            <p>
              <strong>Booster Plan (Premium)</strong>
            </p>

            <p>
              <strong>Minimum pool prize 40 $LYX</strong>
            </p>

            <ul>
              <li>Character / Icon branding in the &ldquo;SweetMatch&rdquo; game</li>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 tweets/mentions on the X platform.</li>
              <li>Follow-up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
              <li>Banners, logos, or artwork on all tweets/mentions</li>
            </ul>

            <p>
              <strong>Tournament Management Fee</strong>
            </p>

            <ul>
              <li>30 $LYX Booster Plan&nbsp;</li>
            </ul>


            <p>Graphic assets for premium packages must be received and the start of the agreement.</p>

            <p>A Pool Prize of $LYX tokens must be received before the tournament begins.&nbsp;</p>

      
            <p>
              <strong>Sweet Plan (Premium)</strong>
            </p>

            <p>
              <strong>Minimum pool prize 100 $LYX</strong>
            </p>

            <ul>
              <li>Character / Icon branding in the &ldquo;SweetMatch&rdquo; game</li>
              <li>Option to use company/developer&rsquo;s token as a prize</li>
              <li>
                Naming Rights of the tournament. (Example: The <em>XYZ</em> company &ldquo;SweetMatch&rdquo; game tournament.)
              </li>
              <li>3 tweets/mentions on the X platform.</li>
              <li>Follow-up data i.e. how many players participated.</li>
              <li>Banner on the CandyZap home page.</li>
              <li>Banners, logos, or artwork on all tweets/mentions</li>
            </ul>

            <p>
              <strong>Tournament Management Fee</strong>
            </p>

            <ul>
              <li>45 $LYX Booster Plan&nbsp;</li>
            </ul>


            <p>Graphic assets for premium packages must be received at the start of the agreement.</p>

            <p>Pool Prize paid in&nbsp; $LYX tokens or the agreed upon token must be received before the tournament begins.&nbsp;</p>


            <p>
              <strong>Tournament Management Fee</strong>
            </p>

            <ul>
              <li>15 $LYX Pink Plan</li>
              <li>30 $LYX Booster Plan</li>
              <li>45 $LYX Sweet Plan</li>
            </ul>

  
            <p>All rights reserved by Aratta Labs.</p>

          </div>
        </div>
      </div>
    </section>
  )
}
