const input = document.querySelector('input')
const btn = document.querySelector('.btn')
const minutes = document.querySelector('.clock_minutes')
const seconds = document.querySelector('.clock_seconds')
const breaker = document.querySelector('.break')
const audio = document.querySelector('.audio')
const audioTheme = document.querySelector('.audio_main')
const stopBtn = document.querySelector('.stop')

const updateTimer = (event) => {
  event.preventDefault()

  if (!input.value || input.value > 60 || input.value <= 0) {
    input.value = ''
    return
  }
  input.disabled = true
  btn.disabled = true

  let totalTimer = input.value

  let minutesUpdate = totalTimer - 1
  let secondsUpdate = 60
  if (minutesUpdate < 10) {
    minutesUpdate = '0' + minutesUpdate
  }

  //создадим кнопку стоп

  const stopBtn = document.createElement('button')
  stopBtn.innerHTML = 'Stop'
  btn.replaceWith(stopBtn)
  stopBtn.classList.add('stop')
  console.log(stopBtn)

  const interval = setInterval(() => {
    function stop() {
      clearInterval(interval)
      breaker.classList.remove('hidden')
      minutes.innerHTML = '00'
      seconds.innerHTML = '00'
      document.body.style.opacity = ''
      stopBtn.style.zIndex = ''
      input.disabled = false
      btn.disabled = false
      input.value = ''
      audioTheme.volume = 0.4
      setTimeout(() => {
        audioTheme.pause()
        audioTheme.currentTime = 0
      }, 3000)
      stopBtn.replaceWith(btn)
    }

    stopBtn.addEventListener('click', stop)

    audioTheme.play()
    breaker.classList.add('hidden')
    if (minutesUpdate === '00' && secondsUpdate === '01') {
      stop()

      audio.play()
      return
    }

    secondsUpdate -= 1

    if (secondsUpdate < 10) {
      secondsUpdate = '0' + secondsUpdate
    }
    if (secondsUpdate === '00') {
      secondsUpdate = 60
      minutesUpdate -= 1
    }

    if (minutesUpdate < 10 && typeof minutesUpdate !== 'string') {
      minutesUpdate = '0' + minutesUpdate
    }

    seconds.innerHTML = secondsUpdate
    minutes.innerHTML = minutesUpdate
  }, 1000)
}

btn.addEventListener('click', updateTimer)
