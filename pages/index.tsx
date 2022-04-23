import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface LottoHistory {
  numbers: number[]
  complement: number
}

const Home: NextPage = () => {
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([])
  const [complementNumber, setComplementNumber] = useState<number>(0)
  const [history, setHistory] = useState<LottoHistory[]>([])

  const addToHistory = (numbers: number[], complement: number): void => {
    setHistory([...history, { numbers: numbers, complement: complement }])
  }

  useEffect(() => {
    const lottoNumbers = generateLottoNumbersWithComplement()
    setLottoNumbers(lottoNumbers[0])
    setComplementNumber(lottoNumbers[1])
    addToHistory(lottoNumbers[0], lottoNumbers[1])
  }, [])

  const reroll = () => {
    const lottoNumbers = generateLottoNumbersWithComplement()
    setLottoNumbers(lottoNumbers[0])
    setComplementNumber(lottoNumbers[1])
    addToHistory(lottoNumbers[0], lottoNumbers[1])
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Lotto grid picker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full w-full flex-1 flex-col items-center justify-center px-20 text-center md:flex-row">
        <div className="mb-8 flex h-full w-full flex-1 flex-col items-center justify-center text-center md:w-8/12">
          <h1 className="text-6xl font-bold">Lotto grid picker</h1>
          <div className="mt-12">
            <div className="flex items-center justify-center">
              {lottoNumbers.map((number) => (
                <div className="m-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-500">
                  {number}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="m-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-500">
                {complementNumber}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  reroll()
                }}
                className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Reroll
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 flex h-full w-full flex-1  flex-col items-center justify-center text-center  md:w-4/12">
          <h2 className="text-4xl font-bold">History</h2>
          <div className="mt-12 flex max-h-[480px] w-full flex-col overflow-auto">
            {history.map((history, index) => (
              <div className="flex w-full items-center justify-center">
                {history.numbers.map((number) => (
                  <div className="m-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-500">
                    {number}
                  </div>
                ))}
                <div className="m-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 bg-blue-500 text-white">
                  {history.complement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://pretotype.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="font-semibold text-[#EE2393]">Pretotype</span>
        </a>
      </footer>
    </div>
  )
}

export default Home

// program that picks the numbers for the lotto
// 1. generate a random number between 1 and 49
// 2. check if the number is already picked
// 3. if it is already picked, go to step 1
// 4. if it is not already picked, add it to the array and go to step 1
// 5. when the array is full, sort it and print it
// 6. pick a complement number between 1 and 9
const generateLottoNumbers = (): number[] => {
  const lottoNumbers: number[] = []
  const pickedNumbers: number = 5

  while (lottoNumbers.length < pickedNumbers) {
    const randomNumber = Math.floor(Math.random() * 49) + 1
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber)
    }
  }
  lottoNumbers.sort((a, b) => a - b)
  return lottoNumbers
}

const generateLottoNumbersWithComplement = (): [number[], number] => {
  const lottoNumbers = generateLottoNumbers()
  const complementNumber = Math.floor(Math.random() * 9) + 1
  return [lottoNumbers, complementNumber]
}
