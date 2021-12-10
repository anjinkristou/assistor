from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from .scraper import Scraper

class Message(Scraper):
    def __init__(self, driver, linkedin_url=None, scrape=True):
        super().__init__(driver)
        self.page_url = linkedin_url if linkedin_url.startswith('http') else "{}/messaging/thread/{}/".format(Scraper.base_url, linkedin_url)
        
        if scrape:
            self.scrape()
    
    def scrape(self):
        self.__parse_header__()
    
    def __parse_header__(self):
        page_url = self.page_url
        self.driver.get(page_url)
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class,'msg-thread')]")))
        
        header_element = self.driver.find_element(By.XPATH, "//div[contains(@class,'msg-thread')]")
        self.full_name = self.__attribute_by_xpath_element__(header_element, "//h2[contains(@class,'msg-entity-lockup')]", "innerHTML")
        self.contact_url = self.__attribute_by_xpath_element__(header_element, "//a[contains(@class,'profile-card-one-to-on')]", "href")
    
    @staticmethod
    def followed_url(driver):
        page_url = "{}/{}".format(Scraper.base_url, "messaging/")
        driver.get(page_url)
        list_element = driver.wait.until(EC.presence_of_element_located((By.XPATH, "//ul[contains(@class,'msg-conversations')]")))
        Scraper.__scroll_element_till_end__(driver, list_element)
        message_elements = list_element.find_elements(By.XPATH, "//a[contains(@class,'msg-conversation-listitem')]")
        return [message_element.get_attribute("href").strip() for message_element in message_elements]