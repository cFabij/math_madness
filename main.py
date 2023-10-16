import pygame
import random


def equation_start_pos():
    global equation_x_pos
    global equation_y_pos

    equation_x_pos = random.randint(50, 700)
    equation_y_pos = 0


def get_equation():
    global first_number
    global second_number
    global solution

    first_number = random.randint(1, 100)
    second_number = random.randint(1, 100)
    solution = first_number + second_number


def main():
    global equation_y_pos

    screen = pygame.display.set_mode((800, 600))
    FONT_SIZE = 36
    font = pygame.font.SysFont(None, FONT_SIZE)
    clock = pygame.time.Clock()
    input_box = pygame.Rect(width=screen.get_width(), height=(FONT_SIZE + 6))
    pygame.draw.rect(screen, (0, 0, 0), input_box)

    FRAME_LIMITER = 60
    ANSWER_TIME = 5

    equation_start_pos()
    get_equation()

    attempt = ""

    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_BACKSPACE:
                    attempt = attempt[:-1]
                elif event.unicode.isdigit():
                    attempt += event.unicode
                    print(attempt + " =? " + str(solution))

        if equation_y_pos >= screen.get_height() or attempt == str(solution):
            if attempt == str(solution):
                attempt = ""

            equation_start_pos()
            get_equation()

        screen.fill((0, 0, 0))

        attempt_text = font.render(attempt, True, (255, 255, 0))
        screen.blit(
            attempt_text, ((screen.get_width() / 5), (screen.get_height() - 40))
        )

        equation = font.render(
            f"{first_number} + {second_number}", True, (255, 255, 255)
        )
        screen.blit(equation, (equation_x_pos, equation_y_pos))
        equation_y_pos += (screen.get_height() / FRAME_LIMITER) / ANSWER_TIME

        pygame.display.update()

        clock.tick(FRAME_LIMITER)


if __name__ == "__main__":
    pygame.init()
    main()
    pygame.quit()
