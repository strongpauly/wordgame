terraform {
  backend "s3" {
    bucket = "wordgame-potsides-com-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }
}
