import dotend from 'dotenv'
dotend.config()
import app from './app'
import './database'


const init = () => {
    app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))
}

init()

