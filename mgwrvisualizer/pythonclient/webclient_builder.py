from distutils.dir_util import copy_tree
import errno
import os
import shutil
import subprocess


def main() -> None:
    start_dir: str = os.getcwd()
    target_destination: str = os.path.join(start_dir, "webclient_dist")

    try:
        os.mkdir(target_destination)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(target_destination):
            pass
        else:
            raise

    # delete contents
    for name in os.listdir(target_destination):
        file: str = os.path.join(target_destination, name)
        try:
            if os.path.isfile(file) or os.path.islink(file):
                os.unlink(file)
            elif os.path.isdir(file):
                shutil.rmtree(file)
        except Exception as e:
            print(f"Failed to delete {file} Reason: {e}")

    # move to webclient directory
    os.chdir("../")
    os.chdir("webclient/")

    # build latest
    subprocess.run(["npm", "install"], shell=True)
    subprocess.run(["npm", "run", "build"], shell=True)

    # move files
    origin: str = os.path.join(os.getcwd(), "dist")
    copy_tree(origin, target_destination)
    os.chdir(start_dir)

    return None


if __name__ == "__main__":
    main()
