const address = "http://localhost:3000"
export default function AllUser() {
    return new Promise((res, rej)=>{
        fetch(address+"/users/all",{
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'

            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
        })
        .then(async data=>{
            const result = await data.json()
            if(data?.status >= 400) throw result
            return result
        })
        .then(res)
        .catch(rej)
    })    
}
