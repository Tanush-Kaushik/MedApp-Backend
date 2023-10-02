import express, { json } from "express";
import { med, schedule, timings, users } from "../models/user.js";


export const router = express.Router()


router.post('/createUser', async (req, res) => {

    const { name, email, password, phone_number, address, age, disease, family_member_name, family_member_phone_number } = req.body

    try {
        let user = await users.create({ name, email, password, phone_number, address, age, disease, family_member_name, family_member_phone_number })

        res.json({
            success: true,
            message: 'user created successfully',
            id: user.id
        })

    } catch (error) {
        console.log(error.message)
        res.send("Server Error")
    }

})



router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        let user = await users.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: 'user not found'
            })
        }

        if (!(password === user.password)) {
            return res.json({
                success: false,
                message: 'invalid credentials'
            })
        }

        res.json({
            success: true,
            id: user.id
        })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})



router.post('/dashboard', async (req, res) => {
    try {

        const { before_breakfast, after_breakfast, before_lunch, after_lunch, before_dinner, after_dinner, id, custom, rt } = req.body

        if(id==null){
            return res.json({
                success:false,
                messgae:'not logged in'
            })
        }
 
        await timings.deleteOne({ userId: id })

        await timings.create({ before_breakfast, after_breakfast, before_lunch, after_lunch, before_dinner, after_dinner, userId: id, custom, recommended_timings: rt })


        async function t() {

            const obj2 = await timings.findOne({ userId: id })

            const { before_breakfast, after_breakfast, before_lunch, after_lunch, before_dinner, after_dinner, custom, recommended_timings } = obj2

            var today = new Date()
            var hours = today.getHours()

            if (!recommended_timings) {

                const bbTime = 7
                const abTime = 9
                const blTime = 12
                const alTime = 14
                const bdTime = 19
                const adTime = 22

                if ((before_breakfast && hours == bbTime) || (after_breakfast && hours == abTime) || (before_lunch && hours == blTime) || (after_lunch && hours == alTime) || (before_dinner && hours == bdTime) || (after_dinner && hours == adTime) || (hours == custom)) {
                    console.log("its time for medicine") // will send phoneNo.,userName,reminder and get true or false

                    const user = await users.findOne({ _id: id })
                    const medi = await med.findOne({ disease: user.disease })

                    res.json({
                        patient_name: user.name,
                        patient_number: user.phone_number,
                        family_member_name: user.family_member_name,
                        family_member_phone_number: user.family_member_phone_number,
                        medicine_name: medi.medicine_name,
                        time: hours
                    })
                }

            }
            else {

                const user = await users.findOne({ _id: id })

                const medi = await med.findOne({ disease: user.disease })

                const medName = medi.medicine_name
                const arr = medi.recommended_timings

                arr.map((i) => {
                    if (hours == i) {
                        console.log(`its time for medicine named ${medName}`)

                        res.json({
                            patient_name: user.name,
                            patient_number: user.phone_number,
                            family_member_name: user.family_member_name,
                            family_member_phone_number: user.family_member_phone_number,
                            medicine_name: medi.medicine_name,
                            time: hours
                        })
                    }
                })
            }
            console.log('everything done')
        }

        setInterval(t, 1000)

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})


router.post('/table', async (req, res) => {

    try {

        const { userId } = req.body
        const table = await schedule.findOne({ userId })

        res.json({
            success: true,
            arr: table.schedule
        }) 

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})


