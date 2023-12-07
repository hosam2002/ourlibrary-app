const express = require(`express`)
const mongoose = require(`mongoose`)

/* server */
const app = express()
const port = 5500

/* register a view engine */
app.set(`view engine`, `ejs`)

/* accessing request.body property */
app.use(express.urlencoded({ extended: false }))

/* public files */
app.use(express.static('public'))

/* imports */
const Update = require(`./models/blog`)
const subjects = require('./modules/subjects')

/* connect to mongo db */
const dburi = `mongodb+srv://hosamumbaddi:hosamdb6070@ourlibrary-db.pfpoxbn.mongodb.net/ourlibrary-site?retryWrites=true&w=majority`
mongoose.connect(dburi).then(success => app.listen(port)).catch(failure => console.log(failure))

/* home router */
app.get(`/`, (req, res) => {

    const createBlog = async () => {
        
        try {

            const accounting = subjects.find(el => el.id == `acc`) 
            const computer   = subjects.find(el => el.id == `bas`)
            const commercial = subjects.find(el => el.id == `com`) 
            const statistics = subjects.find(el => el.id == `sta`) 
            const marketing  = subjects.find(el => el.id == `mar`) 

            // blogs
            const blogCount = await Update.countDocuments()
            const blogFind = await Update.find()

            const getBlogDate = (loop) => {
                
                return `${blogFind[loop].createdAt.getDate()}/${blogFind[loop].createdAt.getMonth() + 1}/${blogFind[loop].createdAt.getFullYear()}`
            }

            res.status(200).render(`index`, {

                title: `ourLibrary`,

                // blog objects
                blogCount: blogCount,
                blogFind: blogFind,
                latest: blogFind[blogFind.length - 1],
                blogDate: getBlogDate,

                // subject objects
                accounting: accounting,
                computer: computer,
                commercial: commercial,
                statistics: statistics,
                marketing: marketing   
            })
            
        } catch (error) {
            
            console.log(error)
        }
    }

    createBlog()
})

app.get('/blogs', (req, res) => {

    const getAllBlogs = async () => {

        try {
            
            const blogCount = await Update.countDocuments()
            const blogFind = await Update.find()

            const getBlogDate = (loop) => {
                
                return `${blogFind[loop].createdAt.getDate()}/${blogFind[loop].createdAt.getMonth() + 1}/${blogFind[loop].createdAt.getFullYear()}`
            }

            res.status(200)
            .render(`blogs`, {

                title: `ourLibrary | Latest news`,

                blogCount: blogCount,
                blogFind: blogFind,
                blogDate: getBlogDate,              
                            
            })
            
        } catch (error) {

            console.log(error)
            
        }    
    }

    getAllBlogs()
})