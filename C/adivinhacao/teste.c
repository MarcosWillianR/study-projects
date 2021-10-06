#include <stdio.h>

int main() {
	int userNumber;

	printf("Qual o numero? \n");
	scanf("%d", &userNumber);

	for(int currentN = 1; currentN <= 10; currentN++) {
		printf("%dx%d=%d\n", userNumber, currentN, userNumber * currentN);
	}
}