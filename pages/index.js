import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { TextField, Select } from '@material-ui/core';

import match from '../src/scripts/read_calendar';

import moment from 'moment';

const region = 'BR';

const OUTPUT_DATE_FORMAT = region === 'BR' ? 'DD/MMM' : 'MMM/DD';

function option(key, leaveDate, returnDate, startDate, endDate, bonusDays, eventName, eventDate, badOption) {
  return (
    <div key={key} className={badOption ? styles.badOption : styles.card}>
      <div className={styles.option}>
        <div className={styles.optionTitle}>Period</div>
        <div className={styles.optionInfo}>from {startDate} to {endDate}</div>
      </div>
      
      <div className={styles.option}>
        <div className={styles.optionTitle}>Leave office</div>
        <div className={styles.optionInfo}>in {leaveDate} and return {returnDate}</div>
      </div>
      
      <div className={styles.option}>
        <div className={styles.optionTitle}>Enjoy</div>
        <div className={styles.optionInfo}>{bonusDays} day(s) due to {eventName} ({eventDate})</div>
      </div>
      
    </div>
  )
}

export default function Home() {
  const events = match();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Vacation Calendar</title>
        <meta name="description" content="Use this tool to find the best days for your vacations!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🏖 
        </h1>
        <h1 className={styles.title}>
          Vacation Calendar
        </h1>

        <p className={styles.description}>
          Use this tool to find the best days for your vacations!
        </p>

        Schedule it now! Pick one of the following options:
        <div className={styles.grid}>
          {events.map((item, key) => (
            option(
              key,
              item.leaveDate.format(OUTPUT_DATE_FORMAT), 
              item.returnDate.format(OUTPUT_DATE_FORMAT),
              item.startDate.format(OUTPUT_DATE_FORMAT),
              item.endDate.format(OUTPUT_DATE_FORMAT),
              item.bonusDays,
              item.eventName,
              item.eventDate.format(OUTPUT_DATE_FORMAT),
              item.badOption
            )
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Made with ❤️
        </a>
      </footer>
    </div>
  )
}
