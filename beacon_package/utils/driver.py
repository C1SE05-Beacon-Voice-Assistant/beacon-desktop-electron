try:
    from selenium import webdriver
except ImportError:
    print("Error when import selenium")


class ChromeDriverCustom:
    def __init__(self):
        self.options = webdriver.ChromeOptions()
        self.options.add_experimental_option("detach", True)
        self.options.add_experimental_option("excludeSwitches", ["enable-logging"])
        self.options.add_argument("--no-proxy-server")
        self.driver = webdriver.Chrome(options=self.options)

    def start(self):
        return self.driver
