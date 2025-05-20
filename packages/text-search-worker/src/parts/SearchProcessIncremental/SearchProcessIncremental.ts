import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchIncrementalOptions } from '../TextSearchIncremental/TextSearchIncremental.ts'
import * as SpawnRipGrep from '../SpawnRipGrep/SpawnRipGrep.ts'
import * as ParseRipGrepOutput from '../ParseRipGrepOutput/ParseRipGrepOutput.ts'
import * as GetTotalResults from '../GetTotalResults/GetTotalResults.ts'

let currentProcess: any = null
let allResults: SearchResult[] = []
let totalResults = 0
let isComplete = false

export const startSearch = async (options: TextSearchIncrementalOptions): Promise<void> => {
  // Cancel any existing search
  if (currentProcess) {
    currentProcess.kill()
  }

  const { ripGrepArgs, searchDir } = options
  currentProcess = SpawnRipGrep.spawnRipGrep(ripGrepArgs, searchDir)
  allResults = []
  totalResults = 0
  isComplete = false

  for await (const chunk of currentProcess.stdout) {
    const parsedResults = ParseRipGrepOutput.parseRipGrepOutput(chunk)
    allResults.push(...parsedResults)
    totalResults = GetTotalResults.getTotalResults(allResults)
  }

  const exitCode = await currentProcess.exitCode
  isComplete = exitCode === 0
  currentProcess = null
}

export const getProgress = (): { totalResults: number; isComplete: boolean } => {
  return {
    totalResults,
    isComplete,
  }
}

export const getResults = (startIndex: number, endIndex: number): readonly SearchResult[] => {
  return allResults.slice(startIndex, endIndex)
}
