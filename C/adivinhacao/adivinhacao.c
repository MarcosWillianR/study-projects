#include <stdio.h>

int main() {

  printf("******************************************\n");
  printf("* Bem vindo ao nosso jogo de adivinhação *\n");
  printf("******************************************\n");

  int secretNumber = 42;
  int userNumber;

  printf("Qual é o seu chute? ");
  scanf("%d", &userNumber);
  printf("seu chute foi %d", userNumber);

}