export function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function calculateNights(startDateStr, endDateStr) {
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)
  const diffMs = end - start
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24))
  return nights > 0 ? nights : 0
}
export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export function formatDateRange(startDateStr, endDateStr) {
  const start = new Date(startDateStr + 'T00:00:00')
  const end = new Date(endDateStr + 'T00:00:00')

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const startMonth = months[start.getMonth()]
  const startDay = start.getDate()
  const endDay = end.getDate()
  const year = start.getFullYear()

  // If same month, show "Jul 4 – 6, 2025"
  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} – ${endDay}, ${year}`
  }

  // If different months, show full format
  const endMonth = months[end.getMonth()]
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`
}

export function handleButtonMouseMove(ev) {
  const { left, top, width, height } = ev.currentTarget.getBoundingClientRect()
  const x = ((ev.clientX - left) / width) * 100
  const y = ((ev.clientY - top) / height) * 100
  ev.currentTarget.style.setProperty('--x', `${x}%`)
  ev.currentTarget.style.setProperty('--y', `${y}%`)
}

let availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function getRandomImageNumber() {
  if (availableNumbers.length === 0) {
    availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
  const randomIndex = Math.floor(Math.random() * availableNumbers.length)
  const pickedNumber = availableNumbers[randomIndex]
  availableNumbers.splice(randomIndex, 1)

  return pickedNumber
}
