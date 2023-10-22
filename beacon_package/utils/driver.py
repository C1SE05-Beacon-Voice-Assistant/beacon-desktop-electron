from selenium import webdriver


class ChromeDriver:
    def __init__(self):
        self.options = webdriver.ChromeOptions()
        self.options.add_experimental_option("detach", True)
        self.options.add_experimental_option("excludeSwitches", ["enable-logging"])
        self.options.add_argument("--no-proxy-server")
        self.driver = webdriver.Chrome(options=self.options)

    def start_driver(self):
        return self.driver

    def stop_driver(self):
        self.driver.quit()
