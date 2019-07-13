/**
 * Created by Administrator on 2019/7/12.
 */

var tikuList = [];
var currentTimu = {};
var score = 0;
var isChoose = false;
var num = 10;

//ajax��ȡ���
$.get("dati.json",function(res){
    console.log(res)
    tikuList = res
})

$('.starbtn').click(function(e){
    $('.gaming').addClass("active")
    $('.starGame').removeClass("active")
    randomRender()
})

$('.hellp').click(function(e){
    $('.bangzu').addClass("active")
    $('starGame').removeClass("active")
    randomRender()
})

function randomRender(){
    var randomIndex = parseInt(Math.random()*tikuList.length);
    currentTimu = tikuList.splice(randomIndex,1)[0];
    console.log(currentTimu)
    $('.timu').html(currentTimu.quiz)
    $('.options').html("");
    currentTimu.options.forEach(function(itme,index){
        $(".options").append(`<div data-index="${index}">${index+1}. ${itme}</div>`)
    })
}
$('.options').click(function(e){
    if(!isChoose){
        console.log(e)
        var index = parseInt(e.target.dataset.index);
        console.log(index+1)
        if(currentTimu.answer==(index+1)){
            score += 10;
            $('[data-index='+index+']').addClass("correct")
        }else{
            var correctIndex = currentTimu.answer -1;
            $('[data-index='+correctIndex+']').addClass("correct")
            $('[data-index='+index+']').addClass("error")
        }
        isChoose = true;
        num--;

        setTimeout(function(){
            if(num==0){
                if(score<60){
                    $('.aquaendGame').addClass("active")
                    $('.score').html(score)
                }else if(score<=90&&score>=60){
                    $('.sosoendGame').addClass("active")
                    $('.score').html(score)
                }else if(score==100){
                	$('.100endGame').addClass("active")
                	$('.score').html(score)
                }
            }else{
                isChoose = false;
                randomRender()
            }
        },2000)
    }
})

$('.cxdati').click(function(){
    location.reload()
})
