import requests
import logging
import json
from datetime import datetime
import sys
from typing import Dict, Any
import time

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'api_test_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

class APITester:
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.token = None
        self.project_id = None
        self.comment_id = None
        self.total_tests = 0
        self.successful_tests = 0
        self.failed_tests = {}
        self.test_user = {
            "email": f"test_{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com",
            "password": "password123",
            "username": f"testuser_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        }

    def log_request(self, method: str, url: str, headers: dict = None, data: dict = None):
        logging.info(f"\nRequest:")
        logging.info(f"Method: {method}")
        logging.info(f"URL: {url}")
        if headers:
            logging.info(f"Headers: {json.dumps(headers, indent=2)}")
        if data:
            logging.info(f"Data: {json.dumps(data, indent=2)}")

    def log_response(self, response: requests.Response):
        logging.info(f"\nResponse:")
        logging.info(f"Status Code: {response.status_code}")
        try:
            logging.info(f"Body: {json.dumps(response.json(), indent=2)}")
        except:
            logging.info(f"Body: {response.text}")

    def log_test(self, test_name: str, response: requests.Response, expected_status: int) -> bool:
        self.total_tests += 1
        success = response.status_code == expected_status
        
        if success:
            self.successful_tests += 1
            logging.info(f"✅ {test_name} - Success")
        else:
            self.failed_tests[test_name] = {
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'response': response.text
            }
            logging.error(f"❌ {test_name} - Failed")
            logging.error(f"Expected status {expected_status}, got {response.status_code}")
        
        return success

    def make_request(self, method: str, endpoint: str, data: dict = None, headers: dict = None, expected_status: int = 200):
        url = f"{self.base_url}{endpoint}"
        
        if self.token and headers:
            headers["Authorization"] = f"Bearer {self.token}"
        elif self.token:
            headers = {"Authorization": f"Bearer {self.token}"}
        
        if data and not headers:
            headers = {"Content-Type": "application/json"}
        elif not headers:
            headers = {}

        self.log_request(method, url, headers, data)
        
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                json=data if data else None
            )
            self.log_response(response)
            return response
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {str(e)}")
            return None

    def test_health(self) -> bool:
        response = self.make_request("GET", "/health")
        return self.log_test("Health Check", response, 200)

    def test_register(self) -> bool:
        response = self.make_request(
            "POST", 
            "/api/auth/register",
            data=self.test_user
        )
        return self.log_test("User Registration", response, 201)

    def test_login(self) -> bool:
        response = self.make_request(
            "POST",
            "/api/auth/login",
            data={
                "email": self.test_user["email"],
                "password": self.test_user["password"]
            }
        )
        success = self.log_test("User Login", response, 200)
        if success:
            self.token = response.json().get('token')
            if not self.token:
                logging.error("No token received in login response")
                return False
        return success

    def test_create_project(self) -> bool:
        data = {
            "title": "Test Project",
            "description": "This is a test project",
            "status": "active"
        }
        response = self.make_request("POST", "/api/projects", data=data)
        success = self.log_test("Create Project", response, 201)
        if success:
            self.project_id = response.json().get('id')
        return success

    def test_get_projects(self) -> bool:
        response = self.make_request("GET", "/api/projects")
        return self.log_test("Get All Projects", response, 200)

    def test_get_project(self) -> bool:
        response = self.make_request("GET", f"/api/projects/{self.project_id}")
        return self.log_test("Get Project by ID", response, 200)

    def test_create_comment(self) -> bool:
        data = {
            "projectId": self.project_id,
            "content": "This is a test comment"
        }
        response = self.make_request("POST", "/api/comments", data=data)
        success = self.log_test("Create Comment", response, 201)
        if success:
            self.comment_id = response.json().get('id')
        return success

    def test_get_comments(self) -> bool:
        response = self.make_request("GET", f"/api/comments/project/{self.project_id}")
        return self.log_test("Get Project Comments", response, 200)

    def test_update_comment(self) -> bool:
        data = {"content": "Updated comment"}
        response = self.make_request("PUT", f"/api/comments/{self.comment_id}", data=data)
        return self.log_test("Update Comment", response, 200)

    def test_update_project(self) -> bool:
        data = {
            "title": "Updated Project",
            "description": "This is an updated project",
            "status": "completed"
        }
        response = self.make_request("PUT", f"/api/projects/{self.project_id}", data=data)
        return self.log_test("Update Project", response, 200)

    def test_delete_comment(self) -> bool:
        response = self.make_request("DELETE", f"/api/comments/{self.comment_id}")
        return self.log_test("Delete Comment", response, 200)

    def test_delete_project(self) -> bool:
        response = self.make_request("DELETE", f"/api/projects/{self.project_id}")
        return self.log_test("Delete Project", response, 200)

    def run_all_tests(self):
        logging.info("\n=== Starting API Tests ===\n")
        
        test_sequence = [
            ("Health Check", self.test_health),
            ("Registration", self.test_register),
            ("Login", self.test_login),
            ("Create Project", self.test_create_project),
            ("Get Projects", self.test_get_projects),
            ("Get Project", self.test_get_project),
            ("Create Comment", self.test_create_comment),
            ("Get Comments", self.test_get_comments),
            ("Update Comment", self.test_update_comment),
            ("Update Project", self.test_update_project),
            ("Delete Comment", self.test_delete_comment),
            ("Delete Project", self.test_delete_project)
        ]

        for test_name, test_func in test_sequence:
            logging.info(f"\n=== Running Test: {test_name} ===")
            try:
                success = test_func()
                if not success and test_name in ["Registration", "Login"]:
                    logging.error(f"Critical test {test_name} failed. Stopping tests.")
                    break
            except Exception as e:
                logging.error(f"Test {test_name} failed with exception: {str(e)}")
                self.failed_tests[test_name] = {
                    'exception': str(e)
                }
                self.total_tests += 1
                if test_name in ["Registration", "Login"]:
                    logging.error("Critical test failed. Stopping tests.")
                    break
            time.sleep(1)  # Add small delay between tests

        self.generate_report()

    def generate_report(self):
        success_rate = (self.successful_tests / self.total_tests) * 100
        
        logging.info("\n=== Test Report ===")
        logging.info(f"Total Tests: {self.total_tests}")
        logging.info(f"Successful Tests: {self.successful_tests}")
        logging.info(f"Failed Tests: {len(self.failed_tests)}")
        logging.info(f"Success Rate: {success_rate:.2f}%")
        
        if self.failed_tests:
            logging.info("\nFailed Tests Details:")
            for test_name, details in self.failed_tests.items():
                logging.info(f"\n{test_name}:")
                for key, value in details.items():
                    logging.info(f"  {key}: {value}")

if __name__ == "__main__":
    tester = APITester()
    tester.run_all_tests()
