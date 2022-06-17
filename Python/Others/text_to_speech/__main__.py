import pyttsx3

#Inicializa a engine
engine = pyttsx3.init()

#Envia comandos para alterar as propriedades
#de voz e velocidade
engine.setProperty("voice", "brazil")
engine.setProperty("rate", 200)

#Processa as modificações feitas até o momento
engine.runAndWait() 

engine.say("Olá, posso ler o que você escreve e falar, tente digitar algo")
engine.runAndWait()
print("\n")
print("Escreva algo para o sistema falar: ")
print("Para sair, digite 'sair!'")
print("\n")

#Loop principal
while True:
    #Pega a entrada do usuário
    frase = input(">") 
    if frase != "sair!":
        #Coloca frase na fila de processamento da engine
        engine.say(frase)
        #Executa os comandos da fila (no caso, say(frase) )
        engine.runAndWait()
    
    else:
        break