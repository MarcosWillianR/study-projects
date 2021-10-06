#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// tudo que começa com # é uma diretiva
// a diretiva "define" possibilita a criação de constantes
// #define NUMERO_DE_TENTATIVAS 3

int main() {
  printf("\n\n");
  printf("          P  /_\\  P                             \n");                          
  printf("         /_\\_|_|_/_\\                              \n");                          
  printf("     n_n | ||. .|| | n_n         Bem vindo ao     \n"); 
  printf("     |_|_|nnnn nnnn|_|_|     Jogo de Adivinhação! \n");
  printf("    |' '  |  |_|  |' '  |                         \n");
  printf("    |_____| ' _ ' |_____|                         \n");        
  printf("         \\__|_|__/                               \n");
  printf("\n\n");

  int seconds = time(0);
  srand(seconds);

  int bigNum = rand();

  int secretNumber = bigNum % 100;
  int userNumber;
  int currentTry = 1;
  double points = 1000;

  int acertou = 0;

  int nivel;
  printf("Qual o nível de dificuldade?\n");
  printf("(1) Fácil (2) Médio (3) Difícil\n\n");
  printf("Escolha: ");
  scanf("%d", &nivel);

  int numTry;

  switch(nivel) {
    case 1: 
      numTry = 20;
      break;
    case 2: 
      numTry = 10;
      break;
    default: 
      numTry = 5;
  }

  for (int i = 1; i <= numTry; i++) {
    printf("Tentativa %d\n", currentTry);
    printf("Qual é o seu chute? ");

    scanf("%d", &userNumber);
    printf("Seu chute foi %d\n", userNumber);

    if (userNumber < 0) {
      printf("Você não pode chutar números negativos!\n");
      continue;
    }

    acertou = userNumber == secretNumber;
    int maior = userNumber > secretNumber;

    if (acertou) {
      break;
    } else if (maior) {
      printf("Seu chute foi maior que o número secreto\n");
    } else {
      printf("Seu chute foi menor que o número secreto\n");
    }

    currentTry++;

    double wastedPoints = abs(userNumber - secretNumber) / (double)2;
    points = points - wastedPoints;
  }

  printf("Fim de jogo!\n");

  if (acertou) {
    printf("\n\n");
    printf("                OOOOOOOOOOO                          \n");               
    printf("            OOOOOOOOOOOOOOOOOOO                      \n");           
    printf("        OOOOOO  OOOOOOOOO  OOOOOO                    \n");        
    printf("      OOOOOO      OOOOO      OOOOOO                  \n");
    printf("    OOOOOOOO  #   OOOOO  #   OOOOOOOO                \n");    
    printf("   OOOOOOOOOO    OOOOOOO    OOOOOOOOOO               \n"); 
    printf("  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO              \n");
    printf("  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO              \n");
    printf("  OOOO  OOOOOOOOOOOOOOOOOOOOOOOOO  OOOO              \n");
    printf("   OOOO  OOOOOOOOOOOOOOOOOOOOOOO  OOOO               \n");
    printf("    OOOO   OOOOOOOOOOOOOOOOOOOO  OOOO                \n");   
    printf("      OOOOO   OOOOOOOOOOOOOOO   OOOO                 \n"); 
    printf("        OOOOOO   OOOOOOOOO   OOOOOO                  \n");  
    printf("          OOOOOO         OOOOOO                      \n");   
    printf("              OOOOOOOOOOOO                           \n");
    printf("\n");

    printf("Você ganhou!\n");
    printf("Você acertou na tentativa de número %d\n", currentTry);
    printf("Total de pontos: %.1f\n", points);
  } else {
    printf("\n\n");
    printf("        \\|/ ____ \\|/        \n");
    printf("         @~/ ,. \\~@          \n");
    printf("        /_( \\__/ )_\\         \n");
    printf("           \\__U_/            \n");
    printf("\n");

    printf("Você perdeu, tente de novo!\n");
  }
}