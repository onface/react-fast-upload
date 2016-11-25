var fms = require('fms')

fms.run({
    port: 38770,
    static: './output',
    view: {
        server: 'http://127.0.0.1:38771',
    },
    ajax: {
        res: {
            ok: {
                status: '',
                code: 0
            },
            err: false
        }
    }
})

fms.ajax({
	type:'post',
	url:'/',
    timeout:5000,
	res:{
		ok:'ok',
		err:'err'
	}
})