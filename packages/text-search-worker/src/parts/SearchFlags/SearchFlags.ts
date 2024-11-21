export const None = 0
export const PreserveCase = 1
export const UseRegularExpression = 1 << 1
export const MatchCase = 1 << 2
export const MatchWholeWord = 1 << 3
export const ReplaceExpanded = 1 << 4
export const DetailsExpanded = 1 << 5

export const hasPreserveCase = (flags: number) => flags & PreserveCase
export const hasUseRegularExpression = (flags: number) => flags & UseRegularExpression
export const hasMatchCase = (flags: number) => flags & MatchCase
export const hasMatchWholeWord = (flags: number) => flags & MatchWholeWord
export const hasReplaceExpanded = (flags: number) => flags & ReplaceExpanded
export const hasDetailsExpanded = (flags: number) => flags & DetailsExpanded

export const togglePreserveCase = (flags: number) => flags ^ PreserveCase
export const toggleUseRegularExpression = (flags: number) => flags ^ UseRegularExpression
export const toggleMatchCase = (flags: number) => flags ^ MatchCase
export const toggleMatchWholeWord = (flags: number) => flags ^ MatchWholeWord
export const toggleReplaceExpanded = (flags: number) => flags ^ ReplaceExpanded
export const toggleDetailsExpanded = (flags: number) => flags ^ DetailsExpanded
