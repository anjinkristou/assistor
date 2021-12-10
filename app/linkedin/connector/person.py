from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from .scraper import Scraper
from .person_types import Experience, Education, Interest, Accomplishment, Contact

class Person(Scraper):
    def __init__(self, driver, linkedin_url=None, scrape=True):
        super().__init__(driver)
        self.page_url = linkedin_url if linkedin_url.startswith('http') else "{}/in/{}/".format(Scraper.base_url, linkedin_url)
        self.name = None
        self.image_url = None
        self.about = None
        self.description = None        
        self.contact_url = None
        self.phone_number = None
        self.phone_type = None
        self.email_address = None
        self.connected = None
        self.birthday = None
        self.address = None
        self.ims_address = None
        self.ims_type = None
        self.company_title = None
        self.company_logo_url = None
        self.experiences = []
        self.educations = []
        self.interests = []
        self.accomplishments = []
        self.also_viewed_urls = []
        self.contacts = []

        if scrape:
            self.scrape()
            
    def to_dict(self):
        return {
            "page_url" : self.page_url,
            "name" : self.name,
            "image_url" : self.image_url,
            "about" : self.about,        
            "description" : self.description,
            "contact_url" : self.contact_url,
            "phone_number" : self.phone_number,
            "phone_type" : self.phone_type,
            "email_address" : self.email_address,
            "connected" : self.connected,
            "address" : self.address,
            "ims_address" : self.ims_address,
            "ims_type" : self.ims_type,
            "experiences" : [experience.to_dict() for experience in self.experiences],
            "educations" : [education.to_dict() for education in self.educations],
            "interests" : [interest.to_dict() for interest in self.interests],
            "accomplishments" : [accomplishment.to_dict() for accomplishment in self.accomplishments],
            "also_viewed_urls" : [also_viewed_url.to_dict() for also_viewed_url in self.also_viewed_urls],
            "contacts" : [contact.to_dict() for contact in self.contacts],
        }
    
    @staticmethod
    def from_dict(dictionary):
        person = Person(None, "", False)
        
        if  type(dictionary) is dict:
            person.page_url = dictionary.get("page_url")
            person.name = dictionary.get("name")
            person.image_url = dictionary.get("image_url")
            person.about = dictionary.get("about")        
            person.description = dictionary.get("description")
            person.contact_url = dictionary.get("contact_url")
            person.phone_number = dictionary.get("phone_number")
            person.phone_type = dictionary.get("phone_type")
            person.email_address = dictionary.get("email_address")
            person.connected = dictionary.get("connected")
            person.address = dictionary.get("address")
            person.ims_address = dictionary.get("ims_address")
            person.ims_type = dictionary.get("ims_type")
            person.also_viewed_urls = dictionary.get("also_viewed_urls")
            person.experiences = [Experience.from_dict(experience) for experience in dictionary.get("experiences")] if dictionary.get("experiences") is not None else []
            person.educations = [Education.from_dict(education) for education in dictionary.get("educations")] if dictionary.get("educations") is not None else []
            person.interests = [Interest.from_dict(interest) for interest in dictionary.get("interests")] if dictionary.get("interests") is not None else []
            person.accomplishments = [Accomplishment.from_dict(accomplishment) for accomplishment in dictionary.get("accomplishments")] if dictionary.get("accomplishments") is not None else []
            person.contacts = [Contact.from_dict(contact) for contact in dictionary.get("contacts")] if dictionary.get("contacts") is not None else []
        
        return person

    def scrape(self):
        page_url = self.page_url
        self.driver.get(page_url)
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//section[contains(@class,'pv-top-card')]")))
        
        self.name = self.__attribute_by_xpath__("//div[contains(@class,'ph5')]//h1")
        self.description = self.__attribute_by_xpath__("//div[contains(@class,'pv-text-details__left-panel')]/div[2]")
        self.location = self.__attribute_by_xpath__("//div[contains(@class,'pv-text-details__left-panel')]/div[3]/span")
        self.image_url =  self.__attribute_by_xpath__("//button[contains(@class,'pv-top-card-profile-picture')]/img", "src")
        self.company_title = self.__text_by_xpath_element__(self.driver,"//ul[contains(@class,'pv-text-details__right-panel')]//h2")
        self.company_logo_url = self.__attribute_by_xpath__("//ul[contains(@class,'pv-text-details__right-panel')]//img", "src")
        
        if self.__find_element_by_xpath__("//button[contains(`class, 'pv-profile-section__see-more')]"):
            show_more = self.driver.find_elements_by('line-clamp-show-more-button')
            show_more.click()
        
        self.about = self.__attribute_by_xpath__("//section[contains(@class,'pv-about-section')]/p/span")
        
        self.__parse_info__()
        self.__parse_experiences__()
        
    def __parse_info__(self):
        contact_info = self.driver.find_element(By.XPATH, "//span[contains(.,'Contact info')]")
        contact_info.click()
        self.driver.wait.until(EC.presence_of_element_located((By.XPATH, "//section[contains(@class,'ci-vanity-url')]//a")))
        
        self.contact_url = self.__attribute_by_xpath__("//section[contains(@class,'ci-vanity-url')]//a", "href")
        self.phone_number = self.__attribute_by_xpath__("//section[contains(@class,'ci-phone')]/ul/li/span[1]")
        self.phone_type = self.__attribute_by_xpath__("//section[contains(@class,'ci-phone')]/ul/li/span[2]")
        self.email_address = self.__attribute_by_xpath__("//section[contains(@class,'ci-email')]//a")
        self.connected = self.__attribute_by_xpath__("//section[contains(@class,'ci-connected')]//span")
        self.birthday = self.__attribute_by_xpath__("//section[contains(@class,'ci-birthday')]//span")
        self.address = self.__attribute_by_xpath__("//section[contains(@class,'ci-address')]/div/a")
        self.ims_address = self.__attribute_by_xpath__("//section[contains(@class,'ci-ims')]/ul/li/span[1]")
        self.ims_type = self.__attribute_by_xpath__("//section[contains(@class,'ci-ims')]/ul/li/span[1]")
        
        cancel_button = self.driver.find_element(By.XPATH, "//button[contains(@class,'dismiss')]")
        cancel_button.click()
        
    def __parse_experiences__(self):
        
        # When button is clicked, the reference to other element is lost 
        show_more_buttons = self.driver.find_elements(By.XPATH, "//button[contains(@class, 'pv-profile-section__see-more')]")
        for i in range(len(show_more_buttons)):
            button = self.driver.find_elements(By.XPATH, "//button[contains(@class, 'pv-profile-section__see-more')]")[0]
            button.click()
        
        experience_elements = self.driver.find_elements(By.XPATH, "//section[contains(@class,'pv-position-entity')]")
        for experience_element in experience_elements:
            self.__parse_experience__(experience_element)
    
    def __parse_experience__(self, experience_element):
        if self.__find_element_by_element_xpath__(experience_element, ".//p[contains(.,'Company Name')]"):
            self.__parse_one_experience__(experience_element)
        elif self.__find_element_by_element_xpath__(experience_element, ".//span[contains(.,'Company Name')]"):
            self.__parse_multiple_experience__(experience_element)
            
    def __parse_one_experience__(self, experience_element):
        company_url = experience_element.find_element(By.XPATH, ".//a").get_attribute("href")
        position_title = self.__text_by_xpath_element__(experience_element, ".//h3")
        company_name = self.__text_by_xpath_element__(experience_element, ".//p[contains(.,'Company Name')]/following-sibling::p")
        period = self.__text_by_xpath_element__(experience_element, ".//span[contains(.,'Dates Employed')]/following-sibling::span")
        duration = self.__text_by_xpath_element__(experience_element, ".//span[contains(.,'Employment Duration')]/following-sibling::span")
        location = self.__text_by_xpath_element__(experience_element, ".//span[contains(.,'Location')]/following-sibling::span")
        description = self.__text_by_xpath_element__(experience_element, ".//p[contains(@class,'pv-entity__description')]")
        
        period_split = period.split(" – ")
        from_date = period_split[0]
        to_date = None if len(period_split) < 2 else period_split[1]
            
        
        self.experiences.append(Experience(from_date=from_date, 
                                            to_date=to_date,
                                            description=description,
                                            position_title=position_title,
                                            duration=duration,
                                            location=location,
                                            company_url=company_url,
                                            company_name=company_name))
    
    def __parse_multiple_experience__(self, experience_element):
        company_url = experience_element.find_element(By.XPATH, ".//a").get_attribute("href")
        company_name = self.__text_by_xpath_element__(experience_element, ".//span[contains(.,'Company Name')]/following-sibling::span")
        total_duration = self.__text_by_xpath_element__(experience_element, ".//span[contains(.,'Total Duration')]/following-sibling::span")
        
        section_elements = experience_element.find_elements(By.XPATH, ".//div[contains(@class,'pv-entity__role-details-container')]")
        for section_element in section_elements:
            self.__parse_experience_section__(section_element, company_url, company_name)
    
    def __parse_experience_section__(self, section_element, company_url, company_name):
        position_title = self.__text_by_xpath_element__(section_element, ".//span[contains(.,'Title')]/following-sibling::span")
        position_type = section_element.find_element_by_tag_name("h4").text
        period = self.__text_by_xpath_element__(section_element, ".//span[contains(.,'Dates Employed')]/following-sibling::span")
        location = self.__text_by_xpath_element__(section_element, ".//span[contains(.,'Location')]/following-sibling::span")
        duration = self.__text_by_xpath_element__(section_element, ".//span[contains(.,'Employment Duration')]/following-sibling::span")
        description = self.__text_by_xpath_element__(section_element, ".//span[contains(@class,'pv-entity__description')]")
        
        period_split = period.split(" – ")
        from_date = period_split[0]
        to_date = None if len(period_split) < 2 else period_split[1]
        
        self.experiences.append(Experience(from_date=from_date, 
                                            to_date=to_date,
                                            description=description,
                                            position_title=position_title,
                                            duration=duration,
                                            location=location,
                                            company_url=company_url,
                                            company_name=company_name))
        
    @staticmethod
    def followed_url(driver):
        pages_url = "{}/{}".format(Scraper.base_url, "mynetwork/invite-connect/connections/")
        driver.get(pages_url)
        driver.wait.until(EC.presence_of_element_located((By.XPATH, "//section[contains(@class,'mn-connections')]/div/ul")))
        Scraper.__scroll_page_till_end__(driver)
        connections_list = driver.find_element(By.XPATH, "//section[contains(@class,'mn-connections')]/div/ul")
        connection_elements = connections_list.find_elements(By.TAG_NAME, 'li')
        
        results = []
        for connection_element in connection_elements:
            image_url = connection_element.find_element_by_tag_name('img').get_attribute('src')
            page_url = connection_element.find_element_by_tag_name('a').get_attribute('href')
            description = connection_element.find_element(By.XPATH, ".//span[contains(@class,'mn-connection-card__occupation')]").text.strip()
            connected = connection_element.find_element_by_tag_name('time').text.replace("Connected", '').strip()
            name = connection_element.find_element(By.XPATH, ".//span[contains(@class,'mn-connection-card__name')]").text.strip()
            results.append({
                "image_url": image_url,
                "page_url": page_url,
                "description": description,
                "connected": connected,
                "name": name
            })

        return results