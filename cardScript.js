$(async function(){
    $('#cardbutton').click(function () {
        let sql='';
        let code='';
        let type = $('#type').prop('checked');
        let number = $('#number').prop('checked');
        let expiration = $('#expiration').prop('checked');
        let owner = $('#owner').prop('checked');
        let num = $('#num').val();
        if(num <= 0 || (type == false && number==false && expiration === false && owner == false) || num>100)
        {
            alert("Złe ustawienia!");
            return;
        }
        code = '<div class="justify-content-md-center row"><h3 class col-md-auto>Your data:</h3></div><a href = "#textarea"> Go to SQL</a> <div class="justify-content-md-center items row">';
        sql = 'CREATE TABLE credit_cards (id INT AUTO_INCREMENT PRIMARY KEY,card_type VARCHAR(20),card_number VARCHAR(16),expiration_date VARCHAR(7),owner VARCHAR(50));';
        sql += 'INSERT INTO credit_cards (';
        if(type){
            sql += 'card_type,';
        }
        if(number){
            sql += 'card_number,';
        }
        if(expiration){
            sql += 'expiration_date,';
        }
        if(owner){
            sql += 'owner,';
        }
        sql = sql.slice(0, -1);
        sql += ')VALUES';
        fetch('https://fakerapi.it/api/v1/credit_cards?_quantity='+ num)
                .then(response => response.json())
                .then(data => {
                    for(let i = 0; i<(data.data).length; i++)
                    {
                        sql += '(';
                        code += '<div class="item col-md-auto">';
                        if(type){
                            code += '<h6 id="card-type">Card type: '+ data.data[i].type + '</h6>';
                            sql+=data.data[i].type+',';
                        }
                        if(number){
                            code += '<h6 id="card-number">Card number: '+ data.data[i].number + '</h6>';
                            sql+=data.data[i].number+',';
                        }
                        if(expiration){
                            code += '<h6 id="card-expiration">Expiration: '+ data.data[i].expiration + '</h6>';
                            sql+=data.data[i].expiration+',';
                        }
                        if(owner){
                            code += '<h6 id="card-owner">Owner: '+ data.data[i].owner + '</h6>';
                            sql+=data.data[i].owner+',';
                        }
                        code += '</div>';
                        sql = sql.slice(0, -1);
                        sql += '),';
                    }
                    sql = sql.slice(0, -1);
                    sql += ';';
                    code += '</div>';
                    code += '<h3>SQL</h3><textarea id="textarea" class = "sqlt" rows="10">'+sql+'</textarea>';
                    code += '<div id="kotwica"><a href="#up">Go up</a></div>';
                    $('#content').html(code);
                    return false;
            })
            .catch(error => console.error('Błąd:', error));
    });
});
