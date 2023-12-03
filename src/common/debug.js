const _DEBUG = import.meta.env.VITE_DEBUG === 'true'

const DEBUG = (msg) => {
    if (_DEBUG) {
        console.log(msg)
    }
}

export default DEBUG