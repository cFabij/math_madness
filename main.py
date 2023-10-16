import pygame
import random
import sys
import math_question
import collision

def get_numbers():
    numbers = math_question.render_math_question()
    first_number = numbers[0]
    second_number = numbers[1]

    return [first_number, second_number]

def starting_text_pos():
    x_pos = random.randint(50, 750)
    y_pos = 0

    return [x_pos, y_pos]

def main() -> None:
    pygame.init()
    screen = pygame.display.set_mode((800, 600))
    font = pygame.font.SysFont(None, 36)
    clock = pygame.time.Clock()

    positions = starting_text_pos()
    text_x_pos = positions[0]
    text_y_pos = positions[1]

    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill((0, 0, 0))

        text = font.render(f"{get_numbers()[0]} + {get_numbers()[1]}", True, (255, 255, 255))
        screen.blit(text, (text_x_pos, text_y_pos))
        text_y_pos += 1
        
        pygame.display.update()

        if collision.check_collision(text_y_pos, screen.get_height()):
            get_numbers()

        clock.tick(60)


if __name__ == "__main__":
    sys.exit(main())
