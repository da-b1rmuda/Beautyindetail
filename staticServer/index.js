const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Beauty in detail.html'))
})
app.get('/Record', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Record.html'))
})
app.get('/service1', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service1.html'))
})
app.get('/service2', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service2.html'))
})
app.get('/service3', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service3.html'))
})
app.get('/service4', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'service4.html'))
})
app.get('/Chart', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Chart.html'))
})
app.get('/Admin_service', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_service.html'))
})
app.get('/Admin_record', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_record.html'))
})
app.get('/Admin_masters', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_masters.html'))
})
app.get('/Admin_clients', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_clients.html'))
})
app.get('/Admin_categoryservice', async (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'Admin_categoryservice.html'))
})

app.listen(5010, () => {
	console.log('Server successfully running on port 5010')
})
