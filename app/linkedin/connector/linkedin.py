from time import sleep
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from .company import Company
from .person import Person
                               
class Linkedin:
    
    def __init__(self, wait_time=10):
    
        options = Options()
        options.add_argument("--headless")
        # options.add_argument("--start-maximized")
        # options.add_argument("--auto-open-devtools-for-tabs")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--no-sandbox")
        # options.add_experimental_option("detach", True)
        options.add_argument("--disable-infobars")
        
        options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
        
        self.driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), options=options)
        self.driver.wait = WebDriverWait(self.driver, wait_time)
        self.base_url = 'https://www.linkedin.com'

    def setBrowserDimentions(self, x=0, y=0, width=1920, height=1080):
        self.driver.set_window_position(-10+x, y)
        self.driver.set_window_size(width, height)
        
    def login(self, username, password):
        self.driver.get(self.base_url + '/login')
        
        try:
            sleep(1)
            self.driver.find_element(By.XPATH, "//button[@action-type='ACCEPT']").click()
        except:
            pass
        
        self.driver.find_element_by_id('username').send_keys(username)
        sleep(1)
        self.driver.find_element_by_id('password').send_keys(password)
        sleep(0.5)
        self.driver.find_element(By.XPATH, "//button[@data-litms-control-urn='login-submit']").submit()

        try:
            sleep(1)
            self.driver.find_element(By.XPATH, "//button[@data-cie-control-urn='checkpoint_remember_me_save_info_no']").click()
        except:
            pass
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//a[@data-control-name='nav_homepage']")))
        
    def logout(self):
        self.driver.find_element(By.XPATH, "//button[contains(., 'Me')]").click()
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'global-nav__me-content')]")))
        self.driver.find_element(By.XPATH, "//a[contains(., 'Sign Out')]").click()
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH,"//button[contains(., 'Sign Out')]"))).click()

    def openPage(self, page_url):
        self.driver.get(page_url)

    def followedPages(self):
        return Company.followed_url(self.driver)

    def company(self, page_url) -> Company:
        return Company(self.driver, page_url)
    
    def followedContacts(self):
        return Person.followed_url(self.driver)
    
    def person(self, page_url) -> Person:
        return Person(self.driver, page_url)
    
    def pageSource(self):
        return self.driver.page_source
        