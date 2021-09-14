from django.shortcuts import render,redirect
from django.contrib import messages
from .models import *
# Create your views here.


def home(request):
    if request.method == "POST":
        username = request.POST.get('username')
        option = request.POST.get('option')
        room_code = request.POST.get('room_code')
        print(room_code,option,username)
        if option == '1':
            game = Game.objects.filter(room_code = room_code).first()
            print(game)
            if game is None:
                message.success(request , "Room code not found")
                return redirect('/')
            
            if game.is_over:
                message.success(request , "Game is over")
                return redirect('/')
             
             
            game.game_opponent = username
            game.save()
            return redirect('/play/' + room_code + '?username='+username) 
        else:
            game = Game(game_creator = username , room_code = room_code)
            game.save()        
            print(game)
            return redirect('/play/' + room_code + '?username='+username)     
            
    return render(request, 'home.html')



def play(request , room_code):
    username = request.GET.get('username')
    game = Game.objects.filter(room_code = room_code).first()
    if(game.game_creator==username):type="white"
    elif(game.game_opponent==username):type="black"
    #print("this game printed here: ",game.game_creator)
    context = {'room_code' : room_code , 'username' : username,'type':type}
    return render(request, 'index.html' , context)