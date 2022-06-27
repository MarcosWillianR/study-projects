#include <stdio.h>

void soma(int inteiros[10]) {
  int soma = 0;
  for (int i = 0; i < 10; i++) {
    printf("%d\n", inteiros);
    soma += inteiros[i];
  }
  // printf("%d\n", soma);
}

void soma_ponteiros(int* num, int a, int b) {
  (*num) = a + b;
}

int main() {
  // int inteiros[10];
  // soma(inteiros);

  int num = 0;

  soma_ponteiros(&num, 5, 10);

  printf("Soma Ponteiros: %d\n", num);
}