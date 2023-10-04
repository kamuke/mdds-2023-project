const authUser = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      };
        const response = await fetch(url + '/api/authUser', fetchOptions);
        const user = await response.json();
        console.log('authUser fetch', user);
        console.log('userInfo', userInfo);
        if (user._id !== userInfo._id ) {
          window.location.href = 'login.html';
          localStorage.removeItem('userInfo');
        }
    } catch (e) {
      console.log(e.message);
      window.location.href = 'login.html';
      localStorage.removeItem('userInfo');
    }
};
authUser();