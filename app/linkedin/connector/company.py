from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from .scraper import Scraper
from .person import Person

class Company(Scraper):
    def __init__(self, driver, linkedin_url=None, scrape=False):
        super().__init__(driver)
        self.page_url = linkedin_url if linkedin_url.startswith('http') else "{}/company/{}/".format(Scraper.base_url, linkedin_url)
        self.logo_url = None
        self.title = None
        self.tag_line = None        
        self.overview = None
        self.website_url = None
        self.industry = None
        self.company_size = None
        self.headquarters = None
        self.company_type = None
        self.founded = None
        self.people = []
        
        if scrape:
            self.scrape()
    
    def to_dict(self):
        return {
            "page_url" : self.page_url,
            "logo_url" : self.logo_url,
            "title" : self.title,
            "tag_line" : self.tag_line,        
            "overview" : self.overview,
            "website_url" : self.website_url,
            "industry" : self.industry,
            "company_size" : self.company_size,
            "headquarters" : self.headquarters,
            "company_type" : self.company_type,
            "founded" : self.founded,
            "people" : [person.to_dict() for person in self.people]
        }
    
    @staticmethod
    def from_dict(dictionary):
        company = Company(None, "", False)
        
        if  type(dictionary) is dict:
            company.page_url = dictionary.get("page_url")
            company.logo_url = dictionary.get("logo_url")
            company.title = dictionary.get("title")
            company.tag_line = dictionary.get("tag_line")        
            company.overview = dictionary.get("overview")
            company.website_url = dictionary.get("website_url")
            company.industry = dictionary.get("industry")
            company.company_size = dictionary.get("company_size")
            company.headquarters = dictionary.get("headquarters")
            company.company_type = dictionary.get("company_type")
            company.founded = dictionary.get("founded")
            company.people = [Person.from_dict(person) for person in dictionary.get("people")] if dictionary.get("people") is not None else []
        
        return company
            
    def scrape(self):
        page_url = self.page_url
        self.driver.get(page_url)
        self.get_general()
        
        tabs = self.__get_tabs__()
        
        if "About" in [tab["name"] for tab in tabs]:
            page_url = "{}about/".format(self.page_url)
            self.driver.get(page_url)
            self.get_about()
        
    def __get_tabs__(self):
        header_element = self.driver.find_element(By.XPATH, "//ul[contains(@class,'org-page-navigation')]")
        tab_elements = header_element.find_elements(By.XPATH, 'li/a')
        return [{"name": tab.get_attribute("innerHTML").strip(),
                 "url": tab.get_attribute("href").strip()} for tab in tab_elements]
    
    def get_general(self):
        self.driver.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "org-top-card__primary-content")))    
        
        header_element = self.driver.find_element(By.XPATH, "//section[contains(@class,'org-top-card')]")
        self.logo_url = self.__attribute_by_xpath_element__(header_element, "//div[contains(@class,'logo')]/img", "src")
        self.title = self.__attribute_by_xpath_element__(header_element, "//div[contains(@class,'mt2')]/div/h1/span")
        self.tag_line = self.__text_by_xpath_element__(header_element, "//div[contains(@class,'mt2')]/div/div")
        return {
            'title': self.title,
            'logo_url': self.logo_url,
            'tag_line': self.tag_line
        }
        
    def get_about(self):
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class,'org-grid__conten')]")))
        
        self.overview = self.__attribute_by_xpath__("//h4[contains(.,'Overview')]/following-sibling::p")
        self.website_url = self.__attribute_by_xpath__("//dt[contains(.,'Website')]/following-sibling::dd/a", "href")
        self.industry = self.__attribute_by_xpath__("//dt[contains(.,'Industry')]/following-sibling::dd")
        self.company_size = self.__attribute_by_xpath__("//dt[contains(.,'Company size')]/following-sibling::dd")
        self.headquarters = self.__attribute_by_xpath__("//dt[contains(.,'Headquarters')]/following-sibling::dd")
        self.company_type = self.__attribute_by_xpath__("//dt[contains(.,'Type')]/following-sibling::dd")
        self.founded = self.__attribute_by_xpath__("//dt[contains(.,'Founded')]/following-sibling::dd")
        
        return {
            'overview': self.overview,
            'website_url': self.website_url,
            'industry': self.industry,
            'company_size': self.company_size,
            'headquarters': self.headquarters,
            'company_type': self.company_type,
            'founded': self.founded
        }
        
    @staticmethod
    def followed_url(driver):
        pages_url = "{}/{}".format(Scraper.base_url, "feed/following/?filterType=company")
        driver.get(pages_url)
        driver.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "feed-following-list")))
        Scraper.__scroll_page_till_end__(driver)
        pages_list = driver.find_element_by_class_name("feed-following-list")
        page_elements = pages_list.find_elements(By.NAME, 'li')
        return [{
            'page_url': page_element.find_element(By.TAG_NAME, 'a').get_attribute('href'),
            'logo_url': page_element.find_element(By.TAG_NAME, 'img').get_attribute('src'),
            'title': page_element.find_element(By.TAG_NAME, 'h3').text.strip(),
            'industry': page_element.find_element(By.TAG_NAME, 'p').text.strip(),
        } for page_element in page_elements]