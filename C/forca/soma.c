#include <stdio.h>

void soma(int inteiros[10]) {
  int soma = 0;
  for (int i = 0; i < 10; i++) {
    printf("%d\n", inteiros);
    soma += inteiros[i];
  }
  // printf("%d\n", soma);
}

int main() {
  int inteiros[10];
  soma(inteiros);
}