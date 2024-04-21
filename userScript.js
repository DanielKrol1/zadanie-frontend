$(async function(){
    $('#userbutton').click(function () {
        let sql='';
        let code='';
        let uuid = $('#uuid').prop('checked');
        let firstname = $('#firstname').prop('checked');
        let lastname = $('#lastname').prop('checked');
        let username = $('#username').prop('checked');
        let password = $('#password').prop('checked');
        let email = $('#email').prop('checked');
        let ip = $('#ip').prop('checked');
        let macaddress = $('#macaddress').prop('checked');
        let num = $('#num1').val();
        if(num <= 0 || (uuid == false && firstname==false && lastname === false && username == false && password == false && email == false && ip == false && macaddress==false) || num>100)
        {
            alert("Złe ustawienia!");
            return;
        }
        code = '<div class="justify-content-md-center row"><h3 class col-md-auto>Your data:</h3></div><a href = "#textarea">Go to SQL</a> <div class=" justify-content-md-center items row">';
        sql = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,uuid VARCHAR(36),firstname VARCHAR(50),lastname VARCHAR(50),username VARCHAR(50),password VARCHAR(255),email VARCHAR(100),ip VARCHAR(45),mac_address VARCHAR(17));';
        sql += 'INSERT INTO users (';
        if(uuid){
            sql += 'uuid,';
        }
        if(firstname){
            sql += 'firstname,';
        }
        if(lastname){
            sql += 'lastname,';
        }
        if(username){
            sql += 'username,';
        }
        if(password){
            sql += 'password,';
        }
        if(email){
            sql += 'email,';
        }
        if(ip){
            sql += 'ip,';
        }
        if(macaddress){
            sql += 'mac_address,';
        }
        sql = sql.slice(0, -1);
        sql += ')VALUES';
        fetch('https://fakerapi.it/api/v1/users?_quantity='+ num)
                .then(response => response.json())
                .then(data => {
                    for(let i = 0; i<(data.data).length; i++)
                    {
                        sql += '(';
                        code += '<div class="item col-md-auto">';
                        if(uuid){
                            code += '<h6 id="user-uuid">Uuid: '+ data.data[i].uuid + '</h6>';
                            sql+=data.data[i].uuid+',';
                        }
                        if(firstname){
                            code += '<h6 id="user-firstname">Firstname: '+ data.data[i].firstname + '</h6>';
                            sql+=data.data[i].firstname+',';
                        }
                        if(lastname){
                            code += '<h6 id="user-lastname">Lastname: '+ data.data[i].lastname + '</h6>';
                            sql+=data.data[i].lastname+',';
                        }
                        if(username){
                            code += '<h6 id="user-username">Username: '+ data.data[i].username + '</h6>';
                            sql+=data.data[i].username+',';
                        }
                        if(password){
                            code += '<h6 id="user-password">Password: '+ data.data[i].password + '</h6>';
                            sql+=data.data[i].password+',';
                        }
                        if(email){
                            code += '<h6 id="user-email">Email: '+ data.data[i].email + '</h6>';
                            sql+=data.data[i].email+',';
                        }
                        if(ip){
                            code += '<h6 id="user-ip">Ip: '+ data.data[i].ip + '</h6>';
                            sql+=data.data[i].ip+',';
                        }
                        if(macaddress){
                            code += '<h6 id="user-macaddress">Mac address: '+ data.data[i].macaddress + '</h6>';
                            sql+=data.data[i].macaddress+',';
                        }
                        code += '</div>';
                        sql = sql.slice(0, -1);
                        sql += '),';
                    }
                    sql = sql.slice(0, -1);
                    sql += ';';
                    code += '</div>';
                    code += '<h3>SQL</h3><textarea id="textarea" class ="sqlt" rows="10">'+sql+'</textarea>';
                    code += '<div id="kotwica"><a href="#up">Go up</a></div>';
                    $('#content').html(code);
                    return false;
            })
            .catch(error => console.error('Błąd:', error));
    });
});