from selenium import webdriver


class ChromeDriver:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_experimental_option("detach", True)
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--no-proxy-server")
        self.driver = webdriver.Chrome(options=options)

    def get_driver(self):
        return self.driver
