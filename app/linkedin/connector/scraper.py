from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException

class Scraper(object):    
    base_url = 'https://www.linkedin.com'
    
    def __init__(self, driver):
        self.driver = driver

    def is_signed_in(self):
        try:
            self.driver.find_element_by_id("profile-nav-item")
            return True
        except:
            pass
        return False

    def __find_element_by_class_name__(self, class_name):
        try:
            self.driver.find_element_by_class_name(class_name)
            return True
        except:
            pass
        return False

    def __find_element_by_id__(self, element_id):
        try:
            self.driver.find_element_by_id(element_id)
            return True
        except:
            pass
        return False

    def __find_element_by_xpath__(self, tag_name):
        try:
            self.driver.find_element(By.XPATH, tag_name)
            return True
        except:
            pass
        return False
    
    def __find_element_by_element_xpath__(self, element, tag_name):
        try:
            element.find_element(By.XPATH, tag_name)
            return True
        except:
            pass
        return False
    
    def __attribute_by_xpath__(self, xpath, attribute = "innerHTML"):
        try:
            return self.driver.find_element(By.XPATH, xpath).get_attribute(attribute).strip()
        except:
            return ""
    
    def __attribute_by_xpath_element__(self, element, xpath, attribute = "innerHTML"):
        try:
            return element.find_element(By.XPATH, xpath).get_attribute(attribute).strip()
        except:
            return ""
    
    def __text_by_xpath_element__(self, element, xpath):
        try:
            return element.find_element(By.XPATH, xpath).text.strip()
        except:
            return ""

    def __find_enabled_element_by_xpath__(self, tag_name):
        try:
            elem = self.driver.find_element(By.XPATH, tag_name)
            return elem.is_enabled()
        except:
            pass
        return False
    
    @staticmethod
    def __scroll_page_till_end__(driver, pause_time = 0.5):
        last_height = driver.execute_script("return document.body.scrollHeight")
        retries = 3
        ret_cpt = 0
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            sleep(pause_time)
            
            try:
                driver.wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[contains(@class,'artdeco-loader')]")))
            except TimeoutException:
                pass
            
            new_height = driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height:
                if ret_cpt < retries:
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight -1000);")
                    ret_cpt += 1
                else:
                    break
            else:
                ret_cpt = 0
                
            last_height = new_height
    
    @staticmethod
    def __scroll_element_till_end__(driver, element, pause_time = 0.5):
        element_id = element.get_attribute("id")
        last_height = driver.execute_script("var my_element = document.getElementById('{}'); return my_element.scrollHeight;".format(element_id))
        retries = 3
        ret_cpt = 0
        while True:
            driver.execute_script("var my_element = document.getElementById('{}'); my_element.scrollTo(0, my_element.scrollHeight);".format(element_id))
            sleep(pause_time)
            
            try:
                driver.wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[contains(@class,'artdeco-loader')]")))
            except TimeoutException:
                pass
            
            new_height = driver.execute_script("var my_element = document.getElementById('{}'); return my_element.scrollHeight;".format(element_id))
            if new_height == last_height:
                if ret_cpt < retries:
                    driver.execute_script("var my_element = document.getElementById('{}'); my_element.scrollTo(0, my_element.scrollHeight -1000);".format(element_id))
                    ret_cpt += 1
                else:
                    break
            else:
                ret_cpt = 0
                
            last_height = new_height
    
    @staticmethod
    def __scroll_element_till_start__(driver, element, pause_time = 0.5):
        element_id = element.get_attribute("id")
        last_height = driver.execute_script("var my_element = document.getElementById('{}'); return my_element.scrollHeight;".format(element_id))
        retries = 3
        ret_cpt = 0
        while True:
            driver.execute_script("var my_element = document.getElementById('{}'); my_element.scrollTo(0, 0);".format(element_id))
            sleep(pause_time)
            
            try:
                driver.wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[contains(@class,'artdeco-loader')]")))
            except TimeoutException:
                pass
            
            new_height = driver.execute_script("var my_element = document.getElementById('{}'); return my_element.scrollHeight;".format(element_id))
            if new_height == last_height:
                if ret_cpt < retries:
                    driver.execute_script("var my_element = document.getElementById('{}'); my_element.scrollTo(0, 1000);".format(element_id))
                    ret_cpt += 1
                else:
                    break
            else:
                ret_cpt = 0
                
            last_height = new_height

    @classmethod
    def __find_first_available_element__(cls, *args):
        for elem in args:
            if elem:
                return elem[0]