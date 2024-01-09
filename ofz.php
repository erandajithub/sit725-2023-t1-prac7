    function loadBankTbl(bankArray) {
        // alert('test');

        var tot_amt = $('#totBal_txt').text();
        // alert(tot_amt);
        var rem_bal = 0;

            var tableDatab = '';
            $('#moreBank tbody').html('').append(tableDatab);
            var totBank = 0;
            var over_pay = 0;
            var l = bankArray.length;
            rem_bal=tot_amt;
            for (var i = 0; i < l; i++) {
                // alert(l);


                var over = parseFloat(bankArray[i]['boverAmount']);
                // alert(over);
                // alert(rem_bal);
                if (rem_bal < over) {
                    var over_pay = rem_bal;
                    var tmp_pay = rem_bal;

                } else  if(rem_bal>0){
                    var over_pay = over;
                    var tmp_pay = over;

                }else {
                     var tmp_pay = 0;

                }
                tableDatab += "<tr>";
                tableDatab += "<td>" + (i + 1) + ".</td>";
                tableDatab += "<td>" + over_pay + "</td>";
                tableDatab += "<td>" + bankArray[i]['slip'] + "</td>";
                tableDatab += "<td class='text text-center'><button class='btn btn-sm btn-danger btn_removebank' data-index='" + bankArray[i]['index'] + "'  value='" + i + "'><i class='fa fa-times'></i></button></td>";
                tableDatab += "</tr>";

                totBank += parseFloat(over_pay);
                rem_bal =rem_bal-tmp_pay;
            // alert(rem_bal);

        }
        $('#moreBank tbody').html('').append(tableDatab);
        $('#tot_bankVal').val(totBank.toFixed(2));
        // calRemainBalance();
        // } else {
        //     alert(tot_bank);
        //     //     alert(totBank);
        // }

        calRemainBalance();
    }