const previousNumber = document.querySelector('.previous-number')
const currentNumber = document.querySelector('.current-number')
const operatorSign = document.querySelector('.operator-sign')
const clearBtn = document.querySelector('.clear')
const switchBtn = document.querySelector('.switch')
const backspaceBtn = document.querySelector('.backspace')
const equalsBtn = document.querySelector('.equals')
const numberBtns = document.querySelectorAll('.number')
const operatorBtns = document.querySelectorAll('.operator')
const historyBtn = document.querySelector('.history-btn')
const historyList = document.querySelector('.history-list')

let result

const backspace = () => {
	currentNumber.textContent = currentNumber.textContent.slice(0, -1)
}

const clearHistory = () => {
	historyList.innerHTML = ''
}

const clearDisplay = () => {
	previousNumber.textContent = ''
	operatorSign.textContent = ''
	currentNumber.textContent = ''
}

const switchNumber = () => {
	if (currentNumber.textContent === '' || currentNumber.textContent === '.')
		return

	currentNumber.textContent = -currentNumber.textContent
}

const addToHistory = () => {
	const newLi = document.createElement('li')
	newLi.classList.add('li-item')
	newLi.textContent = result
	historyList.appendChild(newLi)
}

const useHistoryRecord = (e) => {
	if (e.target.classList.contains('li-item')) {
		currentNumber.textContent = e.target.textContent
	}
}

const showResult = () => {
	previousNumber.textContent = ''
	operatorSign.textContent = ''
	currentNumber.textContent = result

	addToHistory()
}

const populateDisplay = (e) => {
	if (currentNumber.textContent.includes('.') && e.target.textContent === '.')
		return

	currentNumber.textContent = currentNumber.textContent + e.target.textContent
}

const prepareEquation = (e) => {
	if (currentNumber.textContent === '' || currentNumber.textContent === '.')
		return

	previousNumber.textContent = currentNumber.textContent
	operatorSign.textContent = e.target.textContent
	currentNumber.textContent = ''
}

const count = () => {
	if (
		previousNumber.textContent === '' ||
		previousNumber.textContent === '.' ||
		currentNumber.textContent === '' ||
		currentNumber.textContent === '.'
	)
		return

	if (operatorSign.textContent === '/' && currentNumber.textContent == 0) return

	let prev = +previousNumber.textContent
	let curr = +currentNumber.textContent

	switch (operatorSign.textContent) {
		case '+':
			result = prev + curr
			break
		case '-':
			result = prev - curr
			break
		case '*':
			result = prev * curr
			break
		case '/':
			result = prev / curr
			break
		case '%':
			result = (curr / 100) * prev
			break
	}

	showResult()
}

clearBtn.addEventListener('click', clearDisplay)
backspaceBtn.addEventListener('click', backspace)
switchBtn.addEventListener('click', switchNumber)
equalsBtn.addEventListener('click', count)
historyBtn.addEventListener('click', clearHistory)
historyList.addEventListener('click', useHistoryRecord)
numberBtns.forEach((btn) => btn.addEventListener('click', populateDisplay))
operatorBtns.forEach((btn) => btn.addEventListener('click', prepareEquation))
