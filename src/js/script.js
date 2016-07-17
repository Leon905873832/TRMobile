$(function(){

	// ポップアップ機能
	$('.popup_map').click(function(){
		$('.popup_circle').hide();
		var name = $(this).attr('id').replace('link_','');
		$target = $('.popup_circle#'+name);
		$target.fadeIn();
		return false;
	});

	$('.popup_circle').click(function(){
		$(this).hide();
	});

	$('#localmenu_button').click(function(){
		$('#localmenu').show();
		return false;
	});

	$('#localmenu a,#localmenu #localmenu_close').click(function(){
		$('#localmenu').hide();
		return true;
	});
	
	//ポップアップ部分アニメーション
	var btnArr = ['#btn_hair','#btn_eye','#btn_cheek','#btn_skin','#btn_lip'];
	
	setPopUpAnim();
	
	function setPopUpAnim(){
		
		for(var i=0; i<btnArr.length; i++){	
			$(btnArr[i]).fadeTo(0,0);
		}
		setInterval(btAnim,1500);
	}
	
	function btAnim(){
		
		var btnNum = Math.floor(Math.random()*6);
		var btnNum2 = Math.floor(Math.random()*6);
		
		for(var i=0; i<btnArr.length; i++){	
		
			if(i==btnNum || i==btnNum2){
				$(btnArr[i]).fadeTo(500,1);
			}else{
				$(btnArr[i]).fadeTo(500,0);
			}			
		}
	}

});