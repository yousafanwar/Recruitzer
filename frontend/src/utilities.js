import router from './router/index'

// THE FOLLOWING FUNCTION WILL BE USED FOR "LOGIN" & "UPDATE" USERS FUNCTIONS
export async function httpReqPOST(endPoint, ...args){
      let argsBody = {};  
      
      for(let i = 0; i<args.length; i+= 2){
        argsBody[args[i]] = args[i + 1];
        }
      console.log(argsBody);
      try{
        const response = await fetch(`${endPoint}`, {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(argsBody),
        })
        if(!response.ok){
          throw new Error('Failed to login')
        }
        if(response.status === 401){
          router.push('./login')
        }
        let result = await response.json();
        localStorage.setItem('loggedInUser', JSON.stringify(result))
        console.log(result)
        router.push('./')
      }
      catch(error){
            console.error('Error logging in:', error)
      }
}

// THE FOLLOWING FUNCTION WILL BE USED FOR "GET ALL USERS" & "GET INDIVIDUAL USER"
export async function httpReqGET(endPoint, token){
      try {
        const response = await fetch(`${endPoint}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          console.log('Failed to get the all users data', token)
        }
        if (response.status === 401) {
          router.push('/login')
        }
        const result = await response.json()
        console.log(result)
        return result
      } catch (error) {
        console.log(error)
      }
}

export async function httpReqDEL(id, token){
    try {
      await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log('This is the delete function error', error)
    }
}


// THIS FUNCTION RETREIVE LOGIN DATA FROM LOCAL STORAGE
export function getLoginData() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser) {
      router.push('/login')
    }
   let {firstName, lastName, email, roleId, token} = loggedInUser;
    // console.log('in the getlogindata func', roleId);
    return {firstName, lastName, email, roleId, token};
  }

export const loginData = getLoginData();
