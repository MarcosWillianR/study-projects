#include <stdio.h>

// tudo que começa com # é uma diretiva
// a diretiva "define" possibilita a criação de constantes
// #define NUMERO_DE_TENTATIVAS 3

int main() {
  printf("******************************************\n");
  printf("* Bem vindo ao nosso jogo de adivinhação *\n");
  printf("******************************************\n");

  int secretNumber = 42;
  int userNumber;
  int currentTry = 1;

  while (1) {
    printf("Tentativa %d\n", currentTry);
    printf("Qual é o seu chute? ");

    scanf("%d", &userNumber);
    printf("Seu chute foi %d\n", userNumber);

    if (userNumber < 0) {
      printf("Você não pode chutar números negativos!\n");
      continue;
    }

    int acertou = userNumber == secretNumber;
    int maior = userNumber > secretNumber;

    if (acertou) {
      printf("Parabéns, você acertou na tentativa de número %d\n", currentTry);
      printf("Jogue de novo, você é um bom jogador!\n");
      break;
    } else if (maior) {
      printf("Seu chute foi maior que o número secreto\n");
    } else {
      printf("Seu chute foi menor que o número secreto\n");
    }

    currentTry++;
  }

  printf("Fim de jogo!\n");
}