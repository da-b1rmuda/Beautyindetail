const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.get('/Beauty in detail.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Beauty in detail.html'))
})
app.get('/Record.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Record.html'))
})
app.get('/service1.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service1.html'))
})
app.get('/service2.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service2.html'))
})
app.get('/service3.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service3.html'))
})
app.get('/service4.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service4.html'))
})
app.get('/Chart.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Chart.html'))
})
app.get('/Admin_service.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_service.html'))
})
app.get('/Admin_record.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_record.html'))
})
app.get('/Admin_masters.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_masters.html'))
})
app.get('/Admin_clients.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_clients.html'))
})
app.get('/Admin_categoryservice.html', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_categoryservice.html'))
})

app.listen(5010, () => {
	console.log('Server successfully running on port 5010')
})
