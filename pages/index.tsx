import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import FormData from 'form-data'
import addTest from './api/test/add'
import { useEffect, useState } from 'react'


//Start of Page
const Home: NextPage = () => {
  const [optionData, setOptionData] = useState(null)
   
  return (
    <div className={styles.container}>
      <p>Hello</p>

      <main className={styles.main}>
        {
          
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}//end of Home

export default Home
