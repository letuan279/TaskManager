import callAPI from './index'

const SERVER_URL = 'http://localhost:8080/api/v1/'
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "user": "655a1d62787fe99d2289b2f7"
    })
}

export const getAllTasks = async () => {
    try {
        const res = await callAPI(SERVER_URL + 'tasks', options)
        if (res && res.code === "20000") {
            return res.data.tasks
        }
        return []
    } catch (error) {
        console.log("ERROR:::", error.message || "Server error");
    }
}